import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = cookies().get('auth-token')?.value

    if (!token) {
      return null
    }

    const decoded = verify(token, JWT_SECRET) as User
    return decoded
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function isAuthenticated(): boolean {
  return !!cookies().get('auth-token')
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

export function requireAuth() {
  if (!isAuthenticated()) {
    throw new Error('Authentication required')
  }
}

export function requireAdmin(user: User | null) {
  if (!isAdmin(user)) {
    throw new Error('Admin access required')
  }
} 