import { type NextRequest, NextResponse } from 'next/server';

function getApiBaseUrl() {
  return process.env.API_URL ?? 'http://localhost:3001';
}

function getProtectionBypassSecret() {
  return (
    process.env.API_PROTECTION_BYPASS ??
    process.env.AUTOMATION_BYPASS_CMRT_API ??
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  );
}

async function proxyTrpc(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const procedurePath = path.join('/');
  const { search } = request.nextUrl;
  const targetUrl = `${getApiBaseUrl()}/trpc/${procedurePath}${search}`;
  const bypassSecret = getProtectionBypassSecret();
  const headers = new Headers();

  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('content-type', contentType);
  }

  if (bypassSecret) {
    headers.set('x-vercel-protection-bypass', bypassSecret);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    body:
      request.method === 'GET' || request.method === 'HEAD'
        ? undefined
        : await request.text(),
  };

  const upstream = await fetch(targetUrl, init);
  const responseHeaders = new Headers();
  const upstreamContentType = upstream.headers.get('content-type');

  if (upstreamContentType) {
    responseHeaders.set('content-type', upstreamContentType);
  }

  return new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = proxyTrpc;
export const POST = proxyTrpc;
