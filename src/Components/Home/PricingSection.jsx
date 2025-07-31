import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Standard templates'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom templates',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        '1TB storage',
        'Enterprise analytics',
        '24/7 phone support',
        'White-label solution',
        'Advanced API',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24" style={{backgroundColor: 'var(--color-base-100)'}}>
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto" 
            style={{color: 'var(--color-base-content)', opacity: '0.7'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: plan.popular ? 'var(--color-primary)' : 'var(--color-base-300)',
                boxShadow: plan.popular ? '0 25px 50px -12px var(--color-primary)' : 'none'
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: plan.popular ? 1.02 : 1.01 }}
            >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.3 + index * 0.1 }}
                  >
                    <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                      Most Popular
                    </span>
                  </motion.div>
                )}
                
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-2" 
                    style={{color: 'var(--color-base-content)'}}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {plan.name}
                  </motion.h3>
                  <motion.p 
                    className="mb-4" 
                    style={{color: 'var(--color-base-content)', opacity: '0.7'}}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {plan.description}
                  </motion.p>
                  <div className="flex items-baseline justify-center">
                    <motion.span 
                      className="text-5xl font-bold" 
                      style={{color: 'var(--color-base-content)'}}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.5 + index * 0.1 }}
                    >
                      {plan.price}
                    </motion.span>
                    <motion.span 
                      className="ml-2" 
                      style={{color: 'var(--color-base-content)', opacity: '0.7'}}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.7 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {plan.period}
                    </motion.span>
                  </div>
                </motion.div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center" 
                      style={{color: 'var(--color-base-content)', opacity: '0.8'}}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 0.8, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      <motion.svg 
                        className="w-5 h-5 mr-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        style={{color: 'var(--color-success)'}}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.8 + index * 0.1 + featureIndex * 0.05 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    className="block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                    style={{
                      background: plan.popular ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' : 'var(--color-base-300)',
                      color: plan.popular ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                    }}
                  >
                    Get Started
                  </Link>
                </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;