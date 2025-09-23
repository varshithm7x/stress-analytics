import React from 'react';
import { motion } from 'framer-motion';
import { StressResult } from '../types';

interface BiomarkerChartProps {
  result: StressResult;
  isDarkMode: boolean;
}

const BiomarkerChart: React.FC<BiomarkerChartProps> = ({ result, isDarkMode }) => {
  // Debug logging
  console.log('🔍 BiomarkerChart received result:', result);
  console.log('📊 Original biomarker values:', {
    cortisol: result.cortisol_val,
    amylase: result.amylase_val,
    iga: result.iga_val,
    sleep: result.sleep_val
  });

  const biomarkerData = [
    {
      label: 'Cortisol',
      actualValue: result.cortisol_val || 0,
      unit: 'μg/dL',
      color: '#ef4444' // Red
    },
    {
      label: 'Alpha Amylase',
      actualValue: result.amylase_val || 0,
      unit: 'U/L',
      color: '#3b82f6' // Blue
    },
    {
      label: 'IgA',
      actualValue: result.iga_val || 0,
      unit: 'mg/dL',
      color: '#22c55e' // Green
    },
    {
      label: 'Sleep Hours',
      actualValue: result.sleep_val || 0,
      unit: 'hours',
      color: '#f97316' // Orange
    },
  ];

  const chartHeight = 200;
  const availableHeight = 180; // Increased available height for more accurate bars

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
      isDarkMode
        ? 'bg-black border-white/20'
        : 'bg-white border-black/20'
    }`}>
      <h3 className={`text-xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>
        Biomarker Analysis
      </h3>

      {/* Chart Container */}
      <div className="relative mb-6">
        <div
          className={`relative border-l border-b ${
            isDarkMode ? 'border-white/30' : 'border-black/30'
          }`}
          style={{ height: chartHeight, paddingLeft: '40px' }}
        >
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs">
            {[200, 150, 100, 50, 0].map((value) => (
              <span
                key={value}
                className={`${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                style={{ transform: 'translateY(-50%)' }}
              >
                {value}
              </span>
            ))}
          </div>

          {/* Bars Container - Positioned above the bottom border */}
          <div
            className="absolute bottom-0 left-10 right-0 flex justify-around items-end"
            style={{ height: availableHeight, paddingBottom: '2px' }}
          >
            {biomarkerData.map((item, index) => {
              const barHeight = Math.max(3, (item.actualValue / 200) * (availableHeight - 5));
              console.log(`🔍 Bar calculation for ${item.label}: ${item.actualValue}/200 * ${availableHeight - 5} = ${barHeight}px`);
              return (
                <div key={item.label} className="flex flex-col items-center w-16">
                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: barHeight }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="w-full rounded-t mb-2"
                    style={{
                      backgroundColor: item.color,
                      minHeight: '2px'
                    }}
                  />                </div>
              );
            })}
          </div>
        </div>

        {/* Labels below the chart */}
        <div className="flex justify-around mt-2" style={{ paddingLeft: '40px' }}>
          {biomarkerData.map((item, index) => (
            <div key={item.label} className="flex flex-col items-center w-16">
              {/* Value Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className={`text-xs font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                {item.actualValue.toFixed(1)}
              </motion.div>

              {/* X-Axis Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className={`text-xs text-center ${
                  isDarkMode ? 'text-white/70' : 'text-black/70'
                }`}
              >
                {item.label}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {biomarkerData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className={isDarkMode ? 'text-white/80' : 'text-black/80'}>
              {item.label}: {item.actualValue.toFixed(1)} {item.unit}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BiomarkerChart;