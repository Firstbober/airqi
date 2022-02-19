import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

let requests = 0;

setInterval(() => {
	requests = 0;
}, 1000);

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	requests += 1;

	if (requests >= 900) {
		return new Response('Too Many Requests', {
			status: 429,
			headers: [['Retry-After', '2']]
		});
	}

	return NextResponse.next();
}