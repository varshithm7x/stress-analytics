import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StressData } from '../types';

interface StressFormProps {
  onSubmit: (data: StressData) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

const StressForm: React.FC<StressFormProps> = ({ onSubmit, isLoading, isDarkMode }) => {
  const [formData, setFormData] = useState<StressData>({
    user_name: '',
    user_age: 25,
    cortisol_val: 10,
    amylase_val: 50,
    iga_val: 50,
    sleep_val: 7,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof StressData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
    isDarkMode
      ? 'bg-black border-white/30 text-white placeholder-white/50 focus:border-white focus:ring-white/20'
      : 'bg-white border-black/30 text-black placeholder-black/50 focus:border-black focus:ring-black/20'
  }`;

  const sliderClass = `w-full h-2 rounded-lg appearance-none cursor-pointer ${
    isDarkMode ? 'bg-white/20' : 'bg-black/20'
  }`;

  const biomarkerData = [
    {
      field: 'cortisol_val',
      label: 'Cortisol',
      unit: 'μg/dL',
      range: '0-20',
      description: 'Primary stress hormone',
      min: 0,
      max: 20,
      step: 0.1,
    },
    {
      field: 'amylase_val',
      label: 'Amylase',
      unit: 'U/L',
      range: '50-200',
      description: 'Enzyme activity indicator',
      min: 50,
      max: 200,
      step: 1,
    },
    {
      field: 'iga_val',
      label: 'IgA',
      unit: 'mg/dL',
      range: '20-80',
      description: 'Immune system marker',
      min: 20,
      max: 80,
      step: 1,
    }
  ];

  const getSliderBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return isDarkMode
      ? `linear-gradient(to right, #ffffff 0%, #ffffff ${percentage}%, #333333 ${percentage}%, #333333 100%)`
      : `linear-gradient(to right, #000000 0%, #000000 ${percentage}%, #cccccc ${percentage}%, #cccccc 100%)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl border transition-all duration-300 ${
        isDarkMode
          ? 'bg-black border-white/20'
          : 'bg-white border-black/20'
      }`}
    >
      <div className="mb-4">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          Biomarker Assessment
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-3 rounded-xl border ${
            isDarkMode
              ? 'bg-black border-white/20'
              : 'bg-white border-black/20'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-base font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.user_name}
                onChange={(e) => setFormData(prev => ({ ...prev, user_name: e.target.value }))}
                className={inputClass}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className={`block text-base font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Age
              </label>
              <div className="mb-2">
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={formData.user_age}
                  onChange={(e) => handleChange('user_age', e.target.value)}
                  className={sliderClass}
                  style={{ background: getSliderBackground(formData.user_age, 1, 60) }}
                />
              </div>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.user_age}
                onChange={(e) => handleChange('user_age', e.target.value)}
                className={inputClass}
                placeholder="25"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Biomarkers Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-3 rounded-xl border ${
            isDarkMode
              ? 'bg-black border-white/20'
              : 'bg-white border-black/20'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Biomarker Levels
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {biomarkerData.map((biomarker, index) => (
              <motion.div
                key={biomarker.field}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-black border-white/20'
                    : 'bg-white border-black/20'
                }`}
              >
                <div className="mb-2">
                  <h4 className={`font-semibold text-base mb-1 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                    {biomarker.label}
                  </h4>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {biomarker.description}
                  </p>
                </div>

                <div className="mb-2">
                  <input
                    type="range"
                    min={biomarker.min}
                    max={biomarker.max}
                    step={biomarker.step}
                    value={formData[biomarker.field as keyof StressData]}
                    onChange={(e) => handleChange(biomarker.field as keyof StressData, e.target.value)}
                    className={sliderClass}
                    style={{
                      background: getSliderBackground(
                        Number(formData[biomarker.field as keyof StressData]),
                        biomarker.min,
                        biomarker.max
                      )
                    }}
                  />
                </div>

                <input
                  type="number"
                  step={biomarker.step}
                  min={biomarker.min}
                  max={biomarker.max}
                  value={formData[biomarker.field as keyof StressData]}
                  onChange={(e) => handleChange(biomarker.field as keyof StressData, e.target.value)}
                  className={inputClass}
                  placeholder={`${biomarker.min}-${biomarker.max}`}
                  required
                />

                <div className={`flex items-center justify-between mt-2 text-xs ${
                  isDarkMode ? 'text-white/70' : 'text-black/70'
                }`}>
                  <span>Range: {biomarker.range} {biomarker.unit}</span>
                  <span className="font-semibold">{formData[biomarker.field as keyof StressData]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-3 rounded-xl border ${
            isDarkMode
              ? 'bg-black border-white/20'
              : 'bg-white border-black/20'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Lifestyle Factors
          </h3>

          <div>
            <label className={`block text-base font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Sleep Duration (hours)
            </label>

            <div className="mb-2">
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={formData.sleep_val}
                onChange={(e) => handleChange('sleep_val', e.target.value)}
                className={sliderClass}
                style={{ background: getSliderBackground(formData.sleep_val, 0, 12) }}
              />
            </div>

            <input
              type="number"
              step="1"
              min="0"
              max="12"
              value={formData.sleep_val}
              onChange={(e) => handleChange('sleep_val', e.target.value)}
              className={inputClass}
              placeholder="7"
              required
            />
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-white/70' : 'text-black/70'
            }`}>
              Recommended: 7-9 hours per night
            </p>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : isDarkMode
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
              <span>Processing Analysis...</span>
            </>
          ) : (
            <span>Begin Stress Analysis</span>
          )}
        </motion.button>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-4 p-3 rounded-lg border-l-4 ${
          isDarkMode
            ? 'border-white bg-black/50 text-white'
            : 'border-black bg-white/50 text-black'
        }`}
      >
        <p className="text-xs leading-relaxed">
          <strong className="font-semibold">Best Practice:</strong> For optimal accuracy, collect biomarker samples in the morning after an 8-hour fast. Ensure consistent testing conditions for reliable results.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StressForm;