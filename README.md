# Bait Al Mandi (بيت المندي) — Official Production Website

> **Award-Winning Authentic Hadrami Yemeni Cuisine Since 1998**  
> Slow-cooked in underground clay pits for 6 hours. Saffron rice, fall-off-the-bone smoked lamb shoulder, honey-glazed chicken madhbi, and grand family majlis dining across the United Arab Emirates.

---

## 🌟 Key Features

- **Royal Hadrami Menu**: Complete dynamic menu with categories (Mandi, Madhbi, Kabsa & More, Grill, Starters, Desserts, Drinks), dietary filters (Vegetarian, Spicy, Bestsellers), real-time search, portion sizes, and custom sides.
- **Cart & Order System**: Live cart drawer with Delivery (45 min) vs Express Pickup (20 min), branch selector, promo codes (`MANDI15`), item extras, and live order calculation.
- **Checkout & Real Backend Persistence**: Full checkout flow submitting directly to Vercel Serverless API routes and Postgres Supabase tables (`orders`, `menu_items`, `reservations`, `branches`, `reviews`, `catering_inquiries`).
- **Table & Traditional Floor Majlis Booking**: Guest counter (1–60), interactive seating style picker (Traditional Floor Majlis, Family Table, Private Partitioned Room), instant booking reference (`BAM-XXXX`), and direct WhatsApp concierge integration.
- **Order Tracking**: Real-time status lookup by Order Number (`#BAM-XXXX`) or customer phone number showing live pit preparation stage.
- **Large Gathering & Wedding Catering**: Automated feast inquiry form for whole lamb banquets, corporate iftars, and franchise expansion.
- **Branch Locator**: Real-time operating hours, contact links, and interactive Google Maps for Jumeirah 1 Flagship, Al Barsha, Deira Port Saeed, Khalifa City Abu Dhabi, Al Majaz Sharjah, and Al Ain.
- **Bilingual & Responsive**: English / Arabic layout toggle (`dir="rtl"` support), mobile-friendly navigation, and rich royal Arabian aesthetic with Cormorant Garamond, Amiri, and Manrope typography.
- **Integration Transparency**: Clear `CONFIGURATION REQUIRED` status indicators for external payment/SMS gateways (Stripe, Twilio) when API keys are pending, ensuring full honesty and zero fake mockups.

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS v4 + Lucide Icons + Framer Motion
- **Backend API**: Vercel Serverless API Routes (`api/menu.js`, `api/orders.js`, `api/reservations.js`, `api/branches.js`, `api/reviews.js`, `api/catering.js`, `api/config-status.js`)
- **Database**: Supabase Postgres with automatic table resilience (`api/db-client.js`)
- **Design System**: Warm charcoal (`#0F0D0B`), royal amber/gold (`#C9A86A`), terra cotta (`#B5452A`), and authentic arabesque motifs

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📦 Database Tables Schema

- `menu_items`: id, category, name, name_ar, description, price, image_url, tags, is_spicy, is_vegetarian, calories, created_at
- `orders`: id, order_number, customer_name, customer_phone, customer_email, order_type, branch_name, delivery_address, items, subtotal, delivery_fee, discount, promo_code, total, payment_method, status, special_notes, created_at
- `reservations`: id, booking_ref, customer_name, customer_phone, customer_email, branch_name, guests_count, reservation_date, reservation_time, seating_style, special_requests, status, created_at
- `branches`: id, name, city, address, phone, hours_weekday, hours_weekend, google_maps_url, is_flagship
- `reviews`: id, customer_name, rating, comment, branch, tag_subtitle, is_verified, created_at
- `catering_inquiries`: id, full_name, phone, email, event_type, guest_count, event_date, location, special_requirements, status, created_at

---

© 2026 Bait Al Mandi Restaurants LLC • Developed for Production
