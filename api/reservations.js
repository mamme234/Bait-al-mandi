import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { phone, booking_ref, limit = 20 } = req.query;
      let query = supabase.from('reservations').select('*').order('id', { ascending: false }).limit(Number(limit));

      if (booking_ref) {
        query = query.eq('booking_ref', booking_ref.trim().toUpperCase());
      } else if (phone) {
        query = query.like('customer_phone', `%${phone.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const {
        customer_name,
        customer_phone,
        customer_email,
        branch_name = 'Jumeirah 1 Flagship',
        guests_count = 4,
        reservation_date,
        reservation_time,
        seating_style = 'Floor Majlis',
        special_requests = ''
      } = req.body;

      if (!customer_name || !customer_phone || !reservation_date || !reservation_time) {
        return res.status(400).json({ error: 'Name, phone, date, and time are required' });
      }

      const booking_ref = 'BAM-' + Math.random().toString(36).substring(2, 6).toUpperCase();

      const newReservation = {
        booking_ref,
        customer_name: customer_name.trim(),
        customer_phone: customer_phone.trim(),
        customer_email: customer_email ? customer_email.trim() : null,
        branch_name,
        guests_count: Number(guests_count),
        reservation_date,
        reservation_time,
        seating_style,
        special_requests: special_requests.trim() || null,
        status: 'Confirmed',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('reservations')
        .insert(newReservation)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'DELETE' || (req.method === 'PUT' && req.body.status === 'Cancelled')) {
      const { booking_ref, id } = req.body;
      let query = supabase.from('reservations').update({ status: 'Cancelled' });
      if (id) {
        query = query.eq('id', id);
      } else if (booking_ref) {
        query = query.eq('booking_ref', booking_ref);
      } else {
        return res.status(400).json({ error: 'booking_ref or id required' });
      }

      const { data, error } = await query.select().single();
      if (error) throw error;
      return res.status(200).json({ ok: true, cancelled: data });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API reservations error:', err);
    res.status(500).json({ error: err.message });
  }
}
