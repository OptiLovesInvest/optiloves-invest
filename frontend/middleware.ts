import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;

  // Pretty route → static HTML
  if (p === '/property/kin-nsele' || p === '/property/kin-nsele/') {
    const url = req.nextUrl.clone();
    url.pathname = '/__static/kin-nsele/index.html';
    return NextResponse.rewrite(url);
  }

  // Legacy id → pretty path
  if (p === '/property/kin-001') {
    const url = req.nextUrl.clone();
    url.pathname = '/property/kin-nsele';
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

// Limit to property paths
export const config = { matcher: ['/property/:path*'] };
