import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { category, search, diet } = req.query;
      let query = supabase.from('menu_items').select('*').order('id', { ascending: true });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      if (diet === 'veg') {
        query = query.eq('is_vegetarian', true);
      }
      if (diet === 'spicy') {
        query = query.eq('is_spicy', true);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data || [];
      if (search && search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(item => 
          item.name?.toLowerCase().includes(q) || 
          item.description?.toLowerCase().includes(q) ||
          item.name_ar?.includes(q)
        );
      }

      if (diet === 'bestseller') {
        filtered = filtered.filter(item => {
          if (Array.isArray(item.tags)) return item.tags.includes('bestseller');
          return false;
        });
      }

      return res.status(200).json(filtered);
    }

    if (req.method === 'POST') {
      const itemData = req.body;
      const { data, error } = await supabase
        .from('menu_items')
        .insert(itemData)
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API menu error:', err);
    res.status(500).json({ error: err.message });
  }
}
