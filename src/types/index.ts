// Application Types

export interface User {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type LoginMethod = 'demo' | 'email' | 'google';

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

// Future types (not implemented yet - here for architecture planning)
export type ServiceType = 'deep_cleaning' | 'repair' | 'freon' | 'maintenance';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type TechnicianStatus = 'available' | 'busy' | 'offline';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ServiceType;
  duration_minutes: number;
}

export interface Booking {
  id: string;
  customer_id: string;
  technician_id?: string;
  service_id: string;
  scheduled_at: string;
  status: BookingStatus;
  address: string;
  notes?: string;
  created_at: string;
}
