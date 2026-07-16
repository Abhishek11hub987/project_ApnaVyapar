import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_APP_URL || '*') : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400, headers: corsHeaders });
    }

    // Ensure phone has +91 country code for Indian numbers
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    const { data, error } = await supabaseAdmin.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'OTP sent successfully' }, { headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
