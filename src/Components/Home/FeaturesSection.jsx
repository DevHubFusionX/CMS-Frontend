import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Eloquent Editor',
      description: 'A sophisticated writing companion that enhances your prose with literary finesse and stylistic refinement.',
      color: 'blue'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Editorial Collaboration',
      description: 'Seamless manuscript sharing and editorial workflows, like a modern publishing house at your fingertips.',
      color: 'purple'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Reader Insights',
      description: 'Understand your audience with the depth of a literary critic and the precision of a bestselling author.',
      color: 'green'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Manuscript Protection',
      description: 'Guard your literary works with the vigilance of a rare book curator and the security of a vault.',
      color: 'red'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Swift as Thought',
      description: 'Your words flow as quickly as inspiration strikes, with the speed of a well-crafted sonnet.',
      color: 'yellow'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Publication Mastery',
      description: 'Orchestrate your literary releases with the precision of a seasoned publisher and the timing of a poet.',
      color: 'indigo'
    }
  ];

  return (
    <section id="features" className="py-24" style={{backgroundColor: 'var(--color-base-200)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6" 
            style={{color: 'var(--color-base-content)'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Literary Tools for
            <motion.span 
              className="block text-transparent bg-clip-text" 
              style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', WebkitBackgroundClip: 'text'}}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discerning Writers
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto" 
            style={{color: 'var(--color-base-content)', opacity: '0.7'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Every instrument a wordsmith needs to craft, curate, and cultivate their literary garden
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:shadow-2xl" 
              style={{backgroundColor: 'var(--color-base-100)', borderColor: 'var(--color-base-300)'}}
            >
              <motion.div 
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  feature.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  feature.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  feature.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  feature.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  feature.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-4" 
                style={{color: 'var(--color-base-content)'}}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="leading-relaxed" 
                style={{color: 'var(--color-base-content)', opacity: '0.7'}}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
              <motion.div 
                className="absolute inset-0 rounded-2xl" 
                style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', opacity: '0.05'}}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;