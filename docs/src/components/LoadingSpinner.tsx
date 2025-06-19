import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="flex items-center justify-center space-x-2 mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          >
            <MapPin className="h-12 w-12 text-blue-400" />
          </motion.div>
          <motion.span
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            WanderWise
          </motion.span>
        </motion.div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="w-20 h-20 border-4 border-blue-400/30 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Center Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-blue-200 text-lg font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Planning your adventure...
        </motion.p>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;