'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ResourceLocation } from '@/types/database';

// Fix leaflet default icons which break in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export default function MapView({ locations, centerOverride }: { locations: ResourceLocation[], centerOverride?: [number, number] }) {
  // Default center to India if no locations, else first location, or override
  let center: [number, number] = [20.5937, 78.9629];
  let zoom = 5;

  if (centerOverride) {
    center = centerOverride;
    zoom = 12;
  } else {
    const validLocation = locations.find(loc => loc.latitude !== null && loc.longitude !== null);
    if (validLocation) {
      center = [validLocation.latitude!, validLocation.longitude!];
      zoom = 10;
    }
  }

  return (
    <MapContainer center={center} zoom={zoom} className="w-full h-full rounded-2xl z-0 border border-slate-200 shadow-sm" style={{ zIndex: 0 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.filter((loc) => loc.latitude !== null && loc.longitude !== null).map((loc) => (
        <Marker key={loc.id} position={[loc.latitude!, loc.longitude!]} icon={icon}>
          <Popup>
            <div className="p-1 min-w-[200px]">
              <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold uppercase rounded mb-2">
                {loc.type.replace('_', ' ')}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{loc.name}</h3>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">{loc.address}</p>
              
              {(loc.phone || loc.email) && (
                <div className="pt-2 border-t border-slate-100 mt-2 space-y-1">
                  {loc.phone && <p className="text-xs font-medium text-slate-700">📞 {loc.phone}</p>}
                  {loc.email && <p className="text-xs font-medium text-slate-700">✉️ {loc.email}</p>}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
