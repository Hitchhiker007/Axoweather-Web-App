import { NextResponse } from 'next/server';
import { fetchWeatherServer } from '@/app/lib/weather';

export async function POST(req: Request) {
  const { location } = await req.json();
  const data = await fetchWeatherServer(location);
  return NextResponse.json(data);
}
