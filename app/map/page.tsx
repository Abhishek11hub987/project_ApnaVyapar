'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { ResourceLocation } from '@/types/database';
import { MapPin, Building, Briefcase, Info } from 'lucide-react';

const MapView = dynamic(() => import('@/components/map/map-view'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-500 font-medium">Loading map resources...</div>
});

export default function MapPage() {
  const [locations, setLocations] = useState<ResourceLocation[]>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Available filters
  const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];
  const types = ['MSME-DI', 'DIC', 'Bank Branch', 'Incubator'];
  
  // Coordinates for city centers to override map view
  const cityCoordinates: Record<string, [number, number]> = {
    'New Delhi': [28.6139, 77.2090],
    'Mumbai': [19.0760, 72.8777],
    'Bangalore': [12.9716, 77.5946],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Hyderabad': [17.3850, 78.4867],
    'Pune': [18.5204, 73.8567],
  };

  useEffect(() => {
    fetchLocations();
  }, [cityFilter, typeFilter]);

  const fetchLocations = async () => {
    setLoading(true);
    let query = supabase.from('resource_locations').select('*');
    
    if (cityFilter) query = query.eq('city', cityFilter);
    if (typeFilter) query = query.eq('type', typeFilter);

    const { data } = await query;
    setLocations(data || []);
    setLoading(false);
  };

  return (
    <main className="bg-slate-50 flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-64px)]">
      <div className="bg-white border-b border-slate-200 px-4 py-4 z-10 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="text-amber-500" /> Resource Map
            </h1>
            <p className="text-sm text-slate-500">Find nearby government offices, MSME incubators, and helpful bank branches.</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-500 min-w-[140px]"
            >
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-500 min-w-[160px]"
            >
              <option value="">All Resource Types</option>
              <option value="MSME-DI">MSME Dev. Institute</option>
              <option value="DIC">District Industries Center</option>
              <option value="Bank Branch">Bank Branches</option>
              <option value="Incubator">Startup Incubators</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Container - Takes up remaining height */}
      <div className="flex-1 p-4 max-w-7xl mx-auto w-full relative">
        {!loading && locations.length === 0 && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-lg flex items-center gap-3">
            <Info className="text-amber-500" />
            <p className="font-medium text-slate-800">No resources found for these filters.</p>
          </div>
        )}
        <MapView 
          locations={locations} 
          centerOverride={cityFilter ? cityCoordinates[cityFilter] : undefined} 
        />
      </div>
    </main>
  );
}
