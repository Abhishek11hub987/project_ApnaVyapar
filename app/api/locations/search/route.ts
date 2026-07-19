import { NextResponse } from 'next/server';
import { searchLocations } from '@/lib/locations';
import { checkRateLimit } from '@/lib/rate-limit';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || undefined;
    const type = searchParams.get('type') || undefined;
    const city = searchParams.get('city') || undefined;
    const latStr = searchParams.get('lat');
    const lngStr = searchParams.get('lng');
    const limitStr = searchParams.get('limit');

    const parsedLat = latStr ? parseFloat(latStr) : NaN;
    const parsedLng = lngStr ? parseFloat(lngStr) : NaN;
    const parsedLimit = limitStr ? parseInt(limitStr, 10) : NaN;
    const lat = isFinite(parsedLat) ? parsedLat : undefined;
    const lng = isFinite(parsedLng) ? parsedLng : undefined;
    const limit = isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5;

    // Optional auth check for rate limiting
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    
    // We allow public access but rate limit if logged in
    if (session?.user) {
      const isAllowed = await checkRateLimit(session.user.id);
      if (!isAllowed) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
    }

    const locations = await searchLocations({ query, type, city, lat, lng, limit });

    return NextResponse.json(locations);
  } catch (error: any) {
    console.error('Location search error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
