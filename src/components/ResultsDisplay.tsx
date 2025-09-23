import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { StressResult } from '../types';
import BiomarkerChart from './BiomarkerChart';

interface ResultsDisplayProps {
  result: StressResult;
  isDarkMode: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isDarkMode }) => {
  const getStressColor = (level: string) => {
    switch (level) {
      case 'Low': return 'from-green-400 to-green-600'; // Green for good
      case 'Moderate': return 'from-yellow-400 to-orange-500'; // Yellow-orange for moderate
      case 'High': return 'from-red-500 to-red-700'; // Red for high stress
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStressIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle className="w-10 h-10" />;
      case 'Moderate': return <AlertCircle className="w-10 h-10" />;
      case 'High': return <AlertTriangle className="w-10 h-10" />;
      default: return <AlertCircle className="w-10 h-10" />;
    }
  };

  const getStressMessage = (level: string) => {
    switch (level) {
      case 'Low':
        return 'Excellent stress management detected. Your biomarkers indicate optimal wellness levels.';
      case 'Moderate':
        return 'Elevated stress patterns identified. Consider implementing targeted stress reduction strategies.';
      case 'High':
        return 'Significant stress indicators present. Professional consultation recommended for comprehensive wellness assessment.';
      default:
        return 'Stress analysis completed successfully.';
    }
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
      {/* Header */}
      <div className="mb-4">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          Analysis Complete
        </h2>
      </div>

      {/* Main Stress Score */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`relative p-4 rounded-2xl bg-gradient-to-br ${getStressColor(result.level)} text-white mb-4 overflow-hidden`}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-lg">
                {getStressIcon(result.level)}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{result.level} Stress Level</h3>
                <p className="text-lg text-white/90">Overall Assessment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">{result.score}</div>
              <div className="text-lg text-white/90">Stress Index</div>
            </div>
          </div>
          <p className="text-base text-white/95 leading-relaxed">{getStressMessage(result.level)}</p>
        </div>
      </motion.div>

      {/* Biomarker Chart */}
      <div className="mb-4">
        <BiomarkerChart result={result} isDarkMode={isDarkMode} />
      </div>      {/* Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-3 rounded-lg border ${
          isDarkMode
            ? 'bg-black border-white/20'
            : 'bg-white border-black/20'
        }`}
      >
        <h3 className={`text-lg font-bold mb-3 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          Personalized Recommendations
        </h3>

        <div className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-white/10' : 'bg-black/10'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                isDarkMode ? 'bg-white' : 'bg-black'
              }`} />
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-white/90' : 'text-black/90'
              }`}>
                {recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className={`mt-4 p-3 rounded-lg border-l-4 ${
          isDarkMode
            ? 'border-white bg-black/50 text-white'
            : 'border-black bg-white/50 text-black'
        }`}
      >
        <p className="text-xs leading-relaxed">
          <strong className="font-semibold">Medical Disclaimer:</strong> This analysis provides general wellness insights based on biomarker data. Results should not replace professional medical consultation. For persistent stress concerns, please consult qualified healthcare professionals.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;