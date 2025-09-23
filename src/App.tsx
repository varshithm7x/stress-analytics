import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import StressForm from './components/StressForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { StressData, StressResult } from './types';
import { analyzeStress } from './services/api';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StressResult | null>(null);

  const handleAnalyze = async (data: StressData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const result = await analyzeStress(data);
      setResult(result);
      toast.success('Analysis completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      toast.error(`Error: ${errorMessage}`);
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode
        ? 'dark bg-black'
        : 'bg-white'
    }`}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#000000' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: isDarkMode ? '1px solid #ffffff' : '1px solid #000000',
            borderRadius: '8px',
            boxShadow: isDarkMode
              ? '0 4px 6px -1px rgba(255, 255, 255, 0.1)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        }}
      />



      {/* Header */}
      <header className={`relative overflow-hidden border-b ${
        isDarkMode
          ? 'border-white/20'
          : 'border-black/20'
      }`}>
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-black'
            : 'bg-white'
        }`} />
        <div className="relative z-10 container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div>
                <h1 className={`text-3xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>Stress Analytics</h1>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 rounded-lg transition-all duration-300 border ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  : 'bg-black/10 hover:bg-black/20 border-black/20 text-black'
              }`}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.button>
          </div>


        </div>


      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center lg:text-left mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                    Biomarker Input
                  </h3>
                </div>
                <StressForm onSubmit={handleAnalyze} isLoading={isLoading} isDarkMode={isDarkMode} />
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="text-center lg:text-left mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                    Analysis Results
                  </h3>
                </div>

                {isLoading ? (
                  <LoadingSpinner />
                ) : result ? (
                  <ResultsDisplay result={result} isDarkMode={isDarkMode} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-8 rounded-2xl text-center border-2 border-dashed transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-black border-white/30 text-white'
                        : 'bg-white border-black/30 text-black'
                    }`}
                  >

                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      Awaiting Analysis
                    </h4>
                    <p className={`text-base ${
                      isDarkMode ? 'text-white/70' : 'text-black/70'
                    }`}>
                      Complete the form to begin your stress assessment
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-8 border-t ${
        isDarkMode
          ? 'bg-black border-white/20 text-white'
          : 'bg-white border-black/20 text-black'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`text-base ${
            isDarkMode ? 'text-white/70' : 'text-black/70'
          }`}>
            © 2025 Stress Analytics Platform. Powered by advanced machine learning.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;