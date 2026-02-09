import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export interface AdminPayload {
  email: string;
  role: 'admin';
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function isValidAdmin(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@globetrotters.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Y5PQtmYcG8vucGaz661KEUDwxCatjj';
  
  return email === adminEmail && password === adminPassword;
}