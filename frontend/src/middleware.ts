import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/property/kin-001') {
    const url = req.nextUrl.clone(); url.pathname = '/property/kin-nsele';
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/property/:path*'] };
