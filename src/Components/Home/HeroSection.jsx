import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = ({ scrollToSection }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: 'var(--color-base-100)'}}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-300) 100%)'}}></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{backgroundColor: 'var(--color-primary)', opacity: '0.1'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{backgroundColor: 'var(--color-secondary)', opacity: '0.1', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full filter blur-3xl animate-pulse" style={{backgroundColor: 'var(--color-accent)', opacity: '0.05', animationDelay: '2s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{opacity: '0.05'}}>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent('var(--color-base-content)')}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)', // fallback for var(--color-primary) with opacity
                color: 'var(--color-primary-content)',
                border: '1px solid var(--color-primary)',
                borderOpacity: '0.2'
              }}
            >
              <motion.svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                style={{ color: 'var(--color-primary)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </motion.svg>
              <span style={{ color: 'var(--color-primary)' }}>
                Where Stories Come to Life
              </span>
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight" 
            style={{color: 'var(--color-base-content)'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Craft Your
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text" 
              style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)', WebkitBackgroundClip: 'text'}}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Literary Legacy
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" 
            style={{color: 'var(--color-base-content)', opacity: '0.8'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Where words find their perfect home and stories unfold with elegance. 
            A sanctuary for writers, publishers, and storytellers to weave their narratives.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/register"
                className="modern-button group px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-primary-content)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <motion.span
                  className="flex items-center"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Begin Your Story
                  <motion.svg 
                    className="ml-2 h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/blog"
                className="group px-8 py-4 border-2 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center"
                style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'rgba(59, 130, 246, 0.1)'}}
              >
                <motion.span
                  className="flex items-center"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <motion.svg 
                    className="mr-2 h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.25 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </motion.svg>
                  Read Our Blog
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.button
              onClick={() => scrollToSection('features')}
              className="group px-8 py-4 border-2 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              style={{borderColor: 'var(--color-base-300)', color: 'var(--color-base-content)', opacity: '0.8'}}
              whileHover={{ scale: 1.02, borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-base-200)', opacity: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="flex items-center">
                Discover the Craft
                <motion.svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  whileHover={{ y: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { number: '50K+', label: 'Authors & Writers' },
              { number: '99.9%', label: 'Reliability' },
              { number: '1M+', label: 'Stories Published' },
              { number: '24/7', label: 'Literary Support' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text mb-2" 
                  style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', WebkitBackgroundClip: 'text'}}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.6 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm font-medium" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;