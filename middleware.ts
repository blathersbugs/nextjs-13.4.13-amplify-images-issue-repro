import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import * as localedata from './data/locales.json';
 
 
export function middleware(request: any) {

let locales: string[] = ((localedata as any).default as string[]);

let languageHeaders = request.headers.get('accept-language')
let headers = { 'accept-language': languageHeaders }

let languages = new Negotiator({ headers }).languages()
let defaultLocale = 'en-US'
 
// match(languages, locales, defaultLocale) // -> 'en-US'
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
 
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = match(languages, locales, defaultLocale)
 
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|flags|images|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}