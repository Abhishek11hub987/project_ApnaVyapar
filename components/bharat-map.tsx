'use client';

import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { GlassCard } from './ui/glass-card';

// Using a publicly available India TopoJSON
const geoUrl = "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States";

const BharatMapComponent = () => {
  return (
    <GlassCard className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xl font-bold neon-text-teal text-teal-400">Bharat Business Heatmap</h3>
        <p className="text-sm text-slate-400">Click a state to explore top ideas</p>
      </div>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [82.8, 22.5]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup zoom={1} center={[82.8, 22.5]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "rgba(15, 118, 110, 0.2)",
                      stroke: "rgba(45, 212, 191, 0.5)",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "rgba(20, 184, 166, 0.6)",
                      stroke: "#2DD4BF",
                      strokeWidth: 1,
                      outline: "none",
                      filter: "drop-shadow(0 0 8px rgba(45, 212, 191, 0.8))"
                    },
                    pressed: {
                      fill: "#F59E0B",
                      outline: "none",
                    }
                  }}
                  onClick={() => {
                    // Logic to show state specific ideas could go here
                    console.log("Clicked:", geo.properties.NAME_1);
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </GlassCard>
  );
};

export const BharatMap = memo(BharatMapComponent);
