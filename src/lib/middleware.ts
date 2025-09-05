import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function withAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      const token = request.cookies.get('auth-token')?.value;

      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Add user info to request
      (request as any).user = payload;

      return handler(request, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}