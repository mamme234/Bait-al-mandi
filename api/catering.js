import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('catering_inquiries')
        .select('*')
        .order('id', { ascending: false })
        .limit(50);
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const {
        full_name,
        phone,
        email,
        event_type = 'Wedding Feast',
        guest_count = 50,
        event_date,
        location = '',
        special_requirements = ''
      } = req.body;

      if (!full_name || !phone) {
        return res.status(400).json({ error: 'Full name and phone are required' });
      }

      const inquiry = {
        full_name: full_name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        event_type,
        guest_count: Number(guest_count) || 50,
        event_date: event_date || null,
        location: location.trim() || null,
        special_requirements: special_requirements.trim() || null,
        status: 'Pending Contact',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('catering_inquiries')
        .insert(inquiry)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API catering error:', err);
    res.status(500).json({ error: err.message });
  }
}
