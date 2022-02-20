/**
 * Rate limiting middleware.
 *
 * Max amount of requests is 1900 every 5 seconds.
 */

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// Amount of requests.
let requests = 0;

// Reset amount of requests every 5 seconds.
setInterval(() => {
	requests = 0;
}, 5000);

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	requests += 1;

	if (requests >= 1900) {
		return new Response('Too Many Requests', {
			status: 429,
			headers: [['Retry-After', '5']]
		});
	}

	return NextResponse.next();
}