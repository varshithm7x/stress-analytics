import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Heart } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/20 text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />

        {/* Center icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Brain className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-800 mb-2"
      >
        Analyzing Your Data
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6"
      >
        Processing biomarkers and calculating stress levels...
      </motion.p>

      {/* Floating icons */}
      <div className="relative h-16">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            x: [-20, 20, -20]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-1/4 top-0"
        >
          <Activity className="w-6 h-6 text-blue-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [10, -10, 10],
            x: [20, -20, 20]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute right-1/4 top-0"
        >
          <Heart className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: [1, 1.5, 1],
              backgroundColor: ['#e5e7eb', '#3b82f6', '#e5e7eb']
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="h-2 bg-gray-300 rounded"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;