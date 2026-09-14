import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { order_number, phone, limit = 20 } = req.query;
      let query = supabase.from('orders').select('*').order('id', { ascending: false }).limit(Number(limit));

      if (order_number) {
        query = query.eq('order_number', order_number.trim().toUpperCase());
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
        order_type = 'delivery',
        branch_name = 'Jumeirah 1 Flagship',
        delivery_address = '',
        items = [],
        subtotal = 0,
        delivery_fee = 0,
        discount = 0,
        promo_code = '',
        total = 0,
        payment_method = 'Cash on Delivery',
        special_notes = ''
      } = req.body;

      if (!customer_name || !customer_phone) {
        return res.status(400).json({ error: 'Name and Phone are required' });
      }
      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain at least one item' });
      }

      const order_number = 'BAM-' + Math.floor(1000 + Math.random() * 9000);

      const newOrder = {
        order_number,
        customer_name: customer_name.trim(),
        customer_phone: customer_phone.trim(),
        customer_email: customer_email ? customer_email.trim() : null,
        order_type,
        branch_name,
        delivery_address: delivery_address.trim(),
        items,
        subtotal: Number(subtotal),
        delivery_fee: Number(delivery_fee),
        discount: Number(discount),
        promo_code: promo_code || null,
        total: Number(total),
        payment_method,
        status: 'Preparing in Pit',
        special_notes: special_notes.trim() || null,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(newOrder)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, order_number, status } = req.body;
      let query = supabase.from('orders').update({ status });
      if (id) {
        query = query.eq('id', id);
      } else if (order_number) {
        query = query.eq('order_number', order_number);
      } else {
        return res.status(400).json({ error: 'id or order_number required' });
      }

      const { data, error } = await query.select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API orders error:', err);
    res.status(500).json({ error: err.message });
  }
}
