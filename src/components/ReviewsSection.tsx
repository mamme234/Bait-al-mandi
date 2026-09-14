import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Review Form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Slide automatically
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [reviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!authorName.trim() || !comment.trim()) {
      setFeedback({ success: false, message: 'Please provide both your name and review.' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: authorName.trim(),
          rating,
          comment: comment.trim(),
          branch: 'Verified Customer'
        })
      });

      if (!res.ok) throw new Error('Failed to submit review');
      const newRev = await res.json();

      setReviews((prev) => [newRev, ...prev]);
      setActiveSlide(0);
      setAuthorName('');
      setComment('');
      setFeedback({ success: true, message: 'Shukran! Your review is now live on our site.' });
    } catch (err: any) {
      setFeedback({ success: false, message: err.message || 'Error submitting review.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#0f0d0b] border-t border-[#c9a86a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Review Summary & Write Form */}
          <div>
            <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block mb-2">
              — GUEST LOVE • آراء الضيوف
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf5eb] leading-tight">
              12,400+ five-star <span className="italic text-[#c9a86a]">stories</span>
            </h2>

            {/* Scorecard */}
            <div className="flex items-center gap-5 mt-6 bg-[#171310] border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="font-serif text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#f5e6c8] via-[#c9a86a] to-[#e8c99a] bg-clip-text text-transparent">
                4.9
              </span>
              <div>
                <div className="flex text-[#c9a86a] text-sm">
                  {'★★★★★'.split('').map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>
                <p className="text-xs text-[#ede3d0]/60 mt-1">
                  Google Maps • Talabat • Deliveroo • TripAdvisor
                </p>
                <div className="flex flex-wrap gap-2 mt-2.5 text-[11px]">
                  <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[#ede3d0]">
                    Food 4.9
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[#ede3d0]">
                    Service 4.8
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[#ede3d0]">
                    Ambience 4.9
                  </span>
                </div>
              </div>
            </div>

            {/* Write a Review Box */}
            <form onSubmit={handleSubmitReview} className="mt-6 bg-[#171310] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <p className="font-bold text-xs text-[#faf5eb] uppercase tracking-wider">
                Leave a Verified Review:
              </p>

              {feedback && (
                <p
                  className={`text-xs p-2.5 rounded-xl flex items-center gap-2 ${
                    feedback.success
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-950/40 text-red-300 border border-red-500/30'
                  }`}
                >
                  {feedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{feedback.message}</span>
                </p>
              )}

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Name (e.g. Tariq Al Qasimi)"
                  className="bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-xl px-4 py-2 text-xs text-[#faf5eb] outline-none"
                />
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="bg-[#0f0d0b] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#c9a86a] font-bold outline-none"
                >
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★☆ (4/5)</option>
                  <option value={3}>★★★☆☆ (3/5)</option>
                </select>
              </div>

              <textarea
                rows={2}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience (tender lamb, quick delivery, majlis atmosphere...)"
                className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-xl px-4 py-2 text-xs text-[#faf5eb] outline-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] font-bold text-xs tracking-wider transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Submitting Review...' : 'Post Review'}
              </button>
            </form>

          </div>

          {/* Right Reviews Carousel */}
          <div className="relative">
            {reviews.length > 0 ? (
              <div className="bg-[#171310] border border-[#c9a86a]/25 rounded-[32px] p-8 sm:p-10 shadow-2xl relative min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex text-[#c9a86a] text-lg tracking-widest mb-4">
                    {'★'.repeat(reviews[activeSlide]?.rating || 5)}
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-[#faf5eb] italic leading-relaxed">
                    “{reviews[activeSlide]?.comment}”
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] font-bold font-serif text-lg flex items-center justify-center">
                      {reviews[activeSlide]?.customer_name?.[0] || 'G'}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#faf5eb]">
                        {reviews[activeSlide]?.customer_name}
                      </p>
                      <p className="text-xs text-[#ede3d0]/60">
                        {reviews[activeSlide]?.tag_subtitle || 'Verified Diner'}
                      </p>
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex gap-1.5">
                    {reviews.slice(0, 6).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === i ? 'w-6 bg-[#c9a86a]' : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-[#171310] rounded-3xl p-8 text-center text-xs text-[#ede3d0]/60">
                Loading reviews...
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
