'use client';

import React, { memo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = '/india.geojson';

const STATE_IDEAS: Record<string, string[]> = {
  'Maharashtra': ['IT Services', 'Textile Export', 'Food Processing'],
  'Karnataka': ['Tech Startup', 'Flower Farming', 'Handicrafts'],
  'Tamil Nadu': ['Auto Parts', 'Garments', 'Software Services'],
  'Gujarat': ['Diamond Trading', 'Chemicals', 'Textile'],
  'Uttar Pradesh': ['Agriculture', 'Leather Goods', 'Handicrafts'],
  'Rajasthan': ['Tourism', 'Handicrafts', 'Mining'],
  'West Bengal': ['Jute Products', 'Tea Trading', 'IT Services'],
  'Delhi': ['Retail Trade', 'E-commerce', 'Food & Beverage'],
  'Telangana': ['Pharma', 'IT Services', 'Agri Business'],
  'Kerala': ['Spices Export', 'Tourism', 'Cashew Processing'],
  'Punjab': ['Agriculture', 'Sports Goods', 'Agro-processing'],
  'Haryana': ['Auto Industry', 'IT/ITES', 'Agriculture'],
  'Madhya Pradesh': ['Tourism', 'Soybean Processing', 'Textile'],
  'Andhra Pradesh': ['Aquaculture', 'Pharma', 'IT Services'],
  'Bihar': ['Agriculture', 'Silk Weaving', 'Food Processing'],
  'Odisha': ['Mining', 'Handicrafts', 'Tourism'],
  'Assam': ['Tea Export', 'Petroleum', 'Silk Weaving'],
};

interface TooltipState {
  name: string;
  ideas: string[];
  x: number;
  y: number;
}

const BharatMapComponent = () => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseEnter = (stateName: string, e: React.MouseEvent<SVGPathElement>) => {
    const rect = (e.currentTarget.closest('.map-container') as HTMLElement)?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        name: stateName,
        ideas: STATE_IDEAS[stateName] ?? ['Explore opportunities here'],
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tooltip) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip((t) => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  };

  return (
    // Outer glass container
    <div
      className="map-container relative w-full rounded-[20px] overflow-hidden border border-teal-400/20"
      style={{ height: '520px', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* Header */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3
          className="text-xl font-bold text-teal-400"
          style={{ textShadow: '0 0 12px rgba(45,212,191,0.6)' }}
        >
          Bharat Business Heatmap
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Hover a state to explore top ideas</p>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{ left: Math.min(tooltip.x + 14, 550), top: Math.max(tooltip.y - 90, 10) }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-teal-400/50 rounded-xl px-3 py-2 shadow-xl min-w-[150px]">
            <p className="text-teal-400 font-bold text-sm mb-1">{tooltip.name}</p>
            {tooltip.ideas.map((idea, i) => (
              <p key={i} className="text-slate-300 text-xs leading-relaxed">• {idea}</p>
            ))}
          </div>
        </div>
      )}

      {/* Map SVG */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 920,
          center: [83, 22],
        }}
        width={800}
        height={520}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties?.NAME_1 ?? '';
              const hasData = !!STATE_IDEAS[name];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => handleMouseEnter(name, e as unknown as React.MouseEvent<SVGPathElement>)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: {
                      fill: hasData ? 'rgba(45,212,191,0.22)' : 'rgba(45,212,191,0.08)',
                      stroke: 'rgba(45,212,191,0.65)',
                      strokeWidth: 0.8,
                      outline: 'none',
                    },
                    hover: {
                      fill: hasData ? 'rgba(45,212,191,0.6)' : 'rgba(45,212,191,0.35)',
                      stroke: '#2DD4BF',
                      strokeWidth: 1.5,
                      outline: 'none',
                      filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.8))',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#F59E0B',
                      stroke: '#D97706',
                      strokeWidth: 1,
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export const BharatMap = memo(BharatMapComponent);
