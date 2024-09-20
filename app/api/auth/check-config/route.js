import { NextResponse } from 'next/server';
import { getProviders } from 'next-auth/react';

export async function GET() {
  // Check if NEXTAUTH_SECRET is set
  const nextAuthSecret = !!process.env.NEXTAUTH_SECRET;
  // Get available providers
  const providers = await getProviders();

  // Return the configuration status
  return NextResponse.json({
    nextAuthSecret,
    providers: providers || {}
  });
}