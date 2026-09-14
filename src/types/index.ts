export interface MenuItem {
  id: number;
  category: string;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  image_url: string;
  tags?: string[];
  is_spicy: boolean;
  is_vegetarian: boolean;
  calories?: number;
  portion_size?: string;
  is_available?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  extras?: { name: string; price: number }[];
  portion?: string;
}

export interface Order {
  id?: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  order_type: 'delivery' | 'pickup' | 'dine-in';
  branch_name: string;
  delivery_address?: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  discount: number;
  promo_code?: string;
  total: number;
  payment_method: string;
  status: string;
  special_notes?: string;
  created_at?: string;
}

export interface Reservation {
  id?: number;
  booking_ref: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  branch_name: string;
  guests_count: number;
  reservation_date: string;
  reservation_time: string;
  seating_style: string;
  special_requests?: string;
  status: string;
  created_at?: string;
}

export interface Branch {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours_weekday: string;
  hours_weekend: string;
  google_maps_url: string;
  is_flagship?: boolean;
  features?: string[];
  image_url?: string;
}

export interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  tag_subtitle?: string;
  branch?: string;
  dish_recommended?: string;
  is_verified?: boolean;
  created_at?: string;
}

export interface CateringInquiry {
  id?: number;
  full_name: string;
  phone: string;
  email?: string;
  event_type: string;
  guest_count: number;
  event_date?: string;
  location?: string;
  special_requirements?: string;
  status?: string;
}
