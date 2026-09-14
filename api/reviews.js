import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('id', { ascending: false })
        .limit(30);
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { customer_name, rating = 5, comment, branch = 'Jumeirah 1', tag_subtitle = 'Verified guest' } = req.body;
      if (!customer_name || !comment) {
        return res.status(400).json({ error: 'Name and comment are required' });
      }

      const newReview = {
        customer_name: customer_name.trim(),
        rating: Math.max(1, Math.min(5, Number(rating))),
        comment: comment.trim(),
        branch,
        tag_subtitle: tag_subtitle || 'Verified guest',
        is_verified: true,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert(newReview)
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API reviews error:', err);
    res.status(500).json({ error: err.message });
  }
}
