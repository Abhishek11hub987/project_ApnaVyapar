'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ResourceLocation } from '@/types/database';
import { MapPin, Phone, Building2, Map, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const MapView = dynamic(() => import('@/components/map/map-view'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-500 text-sm">Loading map...</div>
});

interface LocationMapCardProps {
  typeQuery: string; // e.g. "MSME-DI" or "FSSAI-Delhi"
  userCity?: string | null;
}

export default function LocationMapCard({ typeQuery, userCity }: LocationMapCardProps) {
  const [locations, setLocations] = useState<ResourceLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        // Parse the query. Format from AI is usually [MAP:Type] or [MAP:Type-City]
        const parts = typeQuery.split('-');
        const type = parts[0];
        let city = parts.length > 1 ? parts[1] : userCity;

        // Try getting user's current GPS location first
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await fetchWithCoords(type, city, latitude, longitude);
            },
            async (err) => {
              console.log("Geolocation denied or failed, falling back to city.", err);
              await fetchWithCoords(type, city);
            },
            { timeout: 5000 }
          );
        } else {
          await fetchWithCoords(type, city);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchWithCoords = async (type: string, city?: string | null, lat?: number, lng?: number) => {
      try {
        const queryParams = new URLSearchParams();
        if (type && type !== 'ANY') queryParams.append('type', type);
        if (city && !lat) queryParams.append('city', city);
        if (lat && lng) {
          queryParams.append('lat', lat.toString());
          queryParams.append('lng', lng.toString());
        }
        queryParams.append('limit', '3');

        const res = await fetch(`/api/locations/search?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch locations');
        const data = await res.json();
        setLocations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [typeQuery, userCity]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 my-3 w-full max-w-md animate-pulse">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-800 my-2 text-sm">
        Failed to load map: {error}
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 my-3 w-full max-w-md text-center">
        <Map className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600 dark:text-slate-400 text-sm">No nearby {typeQuery.split('-')[0]} offices found.</p>
      </div>
    );
  }

  const getMapsLink = (loc: ResourceLocation) => {
    if (loc.latitude && loc.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 my-3 w-full max-w-md shadow-sm overflow-hidden flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <MapPin className="text-teal-600 dark:text-teal-400 w-5 h-5" />
        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Nearest Offices</h4>
      </div>
      
      {/* Map Embed */}
      <div className="h-64 rounded-xl overflow-hidden relative z-0 border border-slate-100 dark:border-slate-800">
        <MapView locations={locations} />
      </div>

      {/* Location List */}
      <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
        {locations.map(loc => (
          <div key={loc.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">{loc.name}</h5>
              <span className="shrink-0 bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {loc.type.replace('_', ' ')}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-start gap-1">
              <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{loc.address}</span>
            </p>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {loc.phone || 'N/A'}
              </div>
              <a 
                href={getMapsLink(loc)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
