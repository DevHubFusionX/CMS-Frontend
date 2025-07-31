import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = ({ scrollToSection }) => {
  return (
    <section className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)'}}>
      <div className="absolute inset-0" style={{backgroundColor: 'var(--color-neutral)', opacity: '0.2'}}></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6" 
            style={{color: 'var(--color-primary-content)'}}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to Pen Your Masterpiece?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 leading-relaxed" 
            style={{color: 'var(--color-primary-content)', opacity: '0.9'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join a distinguished community of authors, editors, and literary minds crafting extraordinary narratives.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-primary)'}}
              >
                Begin Your Literary Journey
              </Link>
            </motion.div>
            <motion.button
              onClick={() => scrollToSection('features')}
              className="border-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              style={{borderColor: 'var(--color-primary-content)', color: 'var(--color-primary-content)'}}
              whileHover={{ scale: 1.02, backgroundColor: 'var(--color-primary-content)', color: 'var(--color-primary)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore the Craft
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;