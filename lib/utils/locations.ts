import { supabaseAdmin } from '@/lib/supabase/admin';
import type { ResourceLocation } from '@/types/location';

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

export async function searchLocations({
  query,
  type,
  lat,
  lng,
  city,
  limit = 5,
  offset = 0,
}: {
  query?: string;
  type?: string;
  lat?: number;
  lng?: number;
  city?: string;
  limit?: number;
  offset?: number;
}) {
  let dbQuery = supabaseAdmin
    .from('resource_locations')
    .select('*', { count: 'exact' })
    .eq('is_active', true);

  if (type) {
    dbQuery = dbQuery.eq('type', type);
  }

  if (city) {
    dbQuery = dbQuery.ilike('city', `%${city}%`);
  }

  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,address.ilike.%${query}%`
    );
  }

  const { data, error } = await dbQuery.range(offset, offset + limit - 1);

  if (error || !data) {
    console.error('Error fetching locations:', error);
    return [];
  }

  let locations = data as ResourceLocation[];

  if (lat && lng) {
    const locationsWithDistance = locations.map(loc => {
      if (loc.latitude && loc.longitude) {
        const distance = getDistanceFromLatLonInKm(lat, lng, loc.latitude, loc.longitude);
        return { ...loc, distance };
      }
      return { ...loc, distance: Infinity };
    });

    locationsWithDistance.sort((a, b) => a.distance - b.distance);
    return locationsWithDistance.slice(0, limit);
  }

  return locations.slice(0, limit);
}
