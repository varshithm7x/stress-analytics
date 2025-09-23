import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, TestTube, Clock, User, Activity, Beaker, Droplets, Moon, Info } from 'lucide-react';
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

  const inputClass = `w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
    isDarkMode
      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 hover:bg-gray-700/70'
      : 'bg-white/70 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/20 hover:bg-white/90 backdrop-blur-sm'
  }`;

  const labelClass = `flex items-center space-x-2 text-base font-semibold mb-3 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  const biomarkerCards = [
    {
      field: 'cortisol_val',
      label: 'Cortisol',
      icon: Droplets,
      unit: 'μg/dL',
      range: '1-20',
      description: 'Primary stress hormone',
      min: 1,
      max: 20,
      step: 0.1,
      color: 'from-red-500 to-orange-500'
    },
    {
      field: 'amylase_val',
      label: 'Amylase',
      icon: Beaker,
      unit: 'U/L',
      range: '20-100',
      description: 'Enzyme activity indicator',
      min: 20,
      max: 100,
      step: 1,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      field: 'iga_val',
      label: 'IgA',
      icon: Activity,
      unit: 'mg/dL',
      range: '50-100',
      description: 'Immune system marker',
      min: 50,
      max: 100,
      step: 1,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800/60 border-gray-700/50 shadow-2xl shadow-gray-900/20'
          : 'bg-white/70 border-white/30 shadow-2xl shadow-gray-900/10'
      }`}
    >
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Biomarker Assessment
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-700/30 border-gray-600/30'
              : 'bg-white/50 border-gray-200/50'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-6 flex items-center ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <User className="w-6 h-6 mr-3 text-blue-500" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                <User className="w-5 h-5 text-blue-500" />
                <span>Full Name</span>
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
              <label className={`block text-base font-semibold mb-3 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Age
              </label>
              <input
                type="number"
                min="1"
                max="120"
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
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-700/30 border-gray-600/30'
              : 'bg-white/50 border-gray-200/50'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Biomarker Levels
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {biomarkerCards.map((biomarker, index) => (
              <motion.div
                key={biomarker.field}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-600/50 hover:border-gray-500'
                    : 'bg-white/60 border-gray-200/60 hover:border-gray-300'
                }`}
              >
                <div className="mb-4">
                  <h4 className={`font-semibold text-lg mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {biomarker.label}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {biomarker.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <input
                    type="range"
                    min={biomarker.min}
                    max={biomarker.max}
                    step={biomarker.step}
                    value={formData[biomarker.field as keyof StressData]}
                    onChange={(e) => handleChange(biomarker.field as keyof StressData, e.target.value)}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(to right, #4b5563 0%, #4b5563 ${((Number(formData[biomarker.field as keyof StressData]) - biomarker.min) / (biomarker.max - biomarker.min)) * 100}%, #374151 ${((Number(formData[biomarker.field as keyof StressData]) - biomarker.min) / (biomarker.max - biomarker.min)) * 100}%, #374151 100%)`
                        : `linear-gradient(to right, #6b7280 0%, #6b7280 ${((Number(formData[biomarker.field as keyof StressData]) - biomarker.min) / (biomarker.max - biomarker.min)) * 100}%, #d1d5db ${((Number(formData[biomarker.field as keyof StressData]) - biomarker.min) / (biomarker.max - biomarker.min)) * 100}%, #d1d5db 100%)`
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
                />                <div className={`flex items-center justify-between mt-3 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
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
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-700/30 border-gray-600/30'
              : 'bg-white/50 border-gray-200/50'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Lifestyle Factors
          </h3>

          <div>
            <label className={`block text-base font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Sleep Duration
            </label>
            
            <div className="mb-4">
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={formData.sleep_val}
                onChange={(e) => handleChange('sleep_val', e.target.value)}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                style={{
                  background: isDarkMode 
                    ? `linear-gradient(to right, #4b5563 0%, #4b5563 ${((formData.sleep_val - 1) / 11) * 100}%, #374151 ${((formData.sleep_val - 1) / 11) * 100}%, #374151 100%)`
                    : `linear-gradient(to right, #6b7280 0%, #6b7280 ${((formData.sleep_val - 1) / 11) * 100}%, #d1d5db ${((formData.sleep_val - 1) / 11) * 100}%, #d1d5db 100%)`
                }}
              />
            </div>
            
            <input
              type="number"
              step="0.5"
              min="1"
              max="12"
              value={formData.sleep_val}
              onChange={(e) => handleChange('sleep_val', e.target.value)}
              className={inputClass}
              placeholder="7"
              required
            />
            <p className={`text-sm mt-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
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
          className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 hover:shadow-3xl'
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
        className={`mt-8 p-5 rounded-2xl border-l-4 border-blue-500 ${
          isDarkMode ? 'bg-blue-900/20 text-blue-200' : 'bg-blue-50 text-blue-800'
        }`}
      >
        <p className="text-sm leading-relaxed">
          <strong className="font-semibold">Best Practice:</strong> For optimal accuracy, collect biomarker samples in the morning after an 8-hour fast. Ensure consistent testing conditions for reliable results.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StressForm;