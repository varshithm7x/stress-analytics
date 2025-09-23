import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp, Heart, Brain, Activity, Target, Award, Shield } from 'lucide-react';
import { StressResult } from '../types';

interface ResultsDisplayProps {
  result: StressResult;
  isDarkMode: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isDarkMode }) => {
  const getStressColor = (level: string) => {
    switch (level) {
      case 'Low': return 'from-emerald-500 to-green-600';
      case 'Moderate': return 'from-amber-500 to-orange-600';
      case 'High': return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStressIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle className="w-10 h-10" />;
      case 'Moderate': return <AlertCircle className="w-10 h-10" />;
      case 'High': return <AlertTriangle className="w-10 h-10" />;
      default: return <Brain className="w-10 h-10" />;
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

  const getProgressColor = (value: number) => {
    if (value >= 0.8) return 'from-emerald-400 to-green-500';
    if (value >= 0.6) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const biomarkerData = [
    {
      label: 'Cortisol',
      value: result.metrics.cortisol_norm,
      icon: Activity,
      description: 'Primary stress hormone',
      color: 'from-red-500 to-orange-500'
    },
    {
      label: 'Amylase',
      value: result.metrics.amylase_norm,
      icon: Target,
      description: 'Enzyme activity marker',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'IgA',
      value: result.metrics.iga_norm,
      icon: Shield,
      description: 'Immune response indicator',
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Sleep Quality',
      value: result.metrics.sleep_norm,
      icon: Brain,
      description: 'Recovery efficiency',
      color: 'from-purple-500 to-indigo-500'
    },
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
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className={`p-4 rounded-2xl mr-4 bg-gradient-to-br ${getStressColor(result.level)}`}>
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Analysis Complete
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive stress assessment results
          </p>
        </div>
      </div>

      {/* Main Stress Score */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`relative p-8 rounded-3xl bg-gradient-to-br ${getStressColor(result.level)} text-white mb-8 overflow-hidden`}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-lg">
                {getStressIcon(result.level)}
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">{result.level} Stress Level</h3>
                <p className="text-xl text-white/90">Overall Assessment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold mb-2">{result.score}</div>
              <div className="text-xl text-white/90">Stress Index</div>
            </div>
          </div>
          <p className="text-lg text-white/95 leading-relaxed">{getStressMessage(result.level)}</p>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10">
          <Activity className="w-full h-full" />
        </div>
      </motion.div>

      {/* Biomarker Analysis Grid */}
      <div className="mb-8">
        <h3 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Biomarker Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {biomarkerData.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600/50 hover:border-gray-500'
                  : 'bg-white/60 border-gray-200/60 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {metric.label}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {metric.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {Math.round(metric.value * 100)}%
                  </div>
                </div>
              </div>

              <div className={`w-full h-3 rounded-full ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                  className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(metric.value)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-6 rounded-2xl border ${
          isDarkMode
            ? 'bg-gray-700/30 border-gray-600/30'
            : 'bg-white/50 border-gray-200/50'
        }`}
      >
        <div className="flex items-center mb-6">
          <Award className={`w-6 h-6 mr-3 ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
          <h3 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Personalized Recommendations
          </h3>
        </div>

        <div className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-102 ${
                isDarkMode ? 'bg-gray-600/30' : 'bg-blue-50/50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${getStressColor(result.level)}`} />
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
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
        className={`mt-8 p-5 rounded-2xl border-l-4 ${
          isDarkMode
            ? 'bg-amber-900/20 border-amber-400 text-amber-200'
            : 'bg-amber-50 border-amber-400 text-amber-800'
        }`}
      >
        <p className="text-sm leading-relaxed">
          <strong className="font-semibold">Medical Disclaimer:</strong> This analysis provides general wellness insights based on biomarker data. Results should not replace professional medical consultation. For persistent stress concerns, please consult qualified healthcare professionals.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;