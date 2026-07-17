import { supabaseAdmin } from './supabase-admin';
import { ResourceLocation } from '@/types/database';

// Haversine formula to calculate distance between two coordinates in kilometers
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
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
  limit = 5
}: {
  query?: string;
  type?: string;
  lat?: number;
  lng?: number;
  city?: string;
  limit?: number;
}) {
  let dbQuery = supabaseAdmin
    .from('resource_locations')
    .select('*')
    .eq('is_active', true);

  if (type) {
    dbQuery = dbQuery.eq('type', type);
  }
  
  if (city) {
    dbQuery = dbQuery.ilike('city', `%${city}%`);
  }

  const { data, error } = await dbQuery;

  if (error || !data) {
    console.error('Error fetching locations:', error);
    return [];
  }

  let locations = data as ResourceLocation[];

  // If query is provided, do a simple JS-side filter (if not using full text search)
  if (query) {
    const q = query.toLowerCase();
    locations = locations.filter(loc => 
      loc.name.toLowerCase().includes(q) || 
      loc.address.toLowerCase().includes(q) ||
      loc.services.some(s => s.toLowerCase().includes(q))
    );
  }

  // If lat/lng is provided, sort by distance
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
