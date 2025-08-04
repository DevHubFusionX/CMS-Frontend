import React from 'react';
import { motion } from 'framer-motion';

const HubFusionxLoader = ({ size = 'md', className = '', message = 'Authenticating your credentials...' }) => {
  const sizeMap = {
    sm: 80,
    md: 100,
    lg: 120,
    xl: 140
  };
  
  const loaderSize = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      {/* Main Loader */}
      <div className="relative" style={{ width: loaderSize, height: loaderSize }}>
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4"
          style={{
            borderColor: 'var(--color-base-300)',
            borderTopColor: 'var(--color-primary)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2"
          style={{
            borderColor: 'var(--color-base-300)',
            borderRightColor: 'var(--color-secondary)'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              color: 'var(--color-primary-content)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            F
          </motion.div>
        </div>
        
        {/* Floating Dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-accent)',
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px'
            }}
            animate={{
              x: [
                Math.cos((i * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.cos(((i + 1) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.cos(((i + 2) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.cos(((i + 3) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.cos((i * Math.PI) / 2) * (loaderSize / 2 - 10)
              ],
              y: [
                Math.sin((i * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.sin(((i + 1) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.sin(((i + 2) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.sin(((i + 3) * Math.PI) / 2) * (loaderSize / 2 - 10),
                Math.sin((i * Math.PI) / 2) * (loaderSize / 2 - 10)
              ],
              scale: [1, 0.5, 1, 1.5, 1],
              opacity: [0.8, 0.3, 0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Loading Message */}
      <div className="text-center space-y-3">
        <motion.div 
          className="h-1 w-48 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-base-300)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
            animate={{ x: [-200, 200] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.p 
          className="font-medium"
          style={{ color: 'var(--color-base-content)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
        
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-success)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
};

export default HubFusionxLoader;