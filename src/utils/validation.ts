// Validation utilities for form fields

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.trim()) {
    return { isValid: false, error: 'Email wajib diisi.' }
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format email tidak valid.' }
  }
  return { isValid: true }
}

export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^(\+62|62|0)[0-9]{8,13}$/
  const cleaned = phone.replace(/[\s\-]/g, '')
  if (!cleaned.trim()) {
    return { isValid: false, error: 'Nomor HP wajib diisi.' }
  }
  if (!phoneRegex.test(cleaned)) {
    return { isValid: false, error: 'Format nomor HP tidak valid (contoh: 08123456789).' }
  }
  return { isValid: true }
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password wajib diisi.' }
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password minimal 8 karakter.' }
  }
  return { isValid: true }
}

export function validateFullName(name: string): ValidationResult {
  if (!name.trim()) {
    return { isValid: false, error: 'Nama lengkap wajib diisi.' }
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Nama terlalu pendek.' }
  }
  return { isValid: true }
}

export type PasswordStrength = 'weak' | 'medium' | 'strong'

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < 8) return 'weak'

  let score = 0
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score >= 3) return 'strong'
  if (score >= 1) return 'medium'
  return 'weak'
}
