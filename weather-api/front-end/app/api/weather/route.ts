import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { location } = await req.json();

  const firebaseFunctionURL = "https://weatheraus-3oizomnaqa-ts.a.run.app"

  const response = await fetch(firebaseFunctionURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
