import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL is not configured. Set NEXT_PUBLIC_API_URL." },
      { status: 500 }
    );
  }

  const normalizedUrl = backendUrl.replace(/\/$/, "");
  const targetUrl = `${normalizedUrl}/api/auth/login`;
  const body = await request.text();

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    body,
  });

  const responseBody = await response.text();
  const contentType = response.headers.get("content-type") || "application/json";

  return new Response(responseBody, {
    status: response.status,
    headers: { "Content-Type": contentType },
  });
}
