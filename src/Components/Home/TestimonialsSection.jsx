import React from 'react';
import { AnimatedContainer } from '../Common';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "FusionX transformed how we manage content. The AI features are incredible and saved us countless hours.",
      author: "Sarah Chen",
      role: "Content Director",
      company: "TechCorp",
      avatar: "SC"
    },
    {
      quote: "The collaboration features are game-changing. Our team can work together seamlessly from anywhere.",
      author: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "StartupXYZ",
      avatar: "MR"
    },
    {
      quote: "Best CMS we've ever used. The analytics help us understand our audience better than ever before.",
      author: "Emily Johnson",
      role: "Digital Strategist",
      company: "Agency Pro",
      avatar: "EJ"
    }
  ];

  return (
    <section id="testimonials" className="py-24" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer animation="fade-in">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--color-base-content)'}}>
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
              See what our customers are saying about FusionX
            </p>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedContainer key={index} animation="slide-up" delay={index * 150}>
              <div className="backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}} onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-base-300)'}>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{color: 'var(--color-warning)'}}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg mb-6 leading-relaxed" style={{color: 'var(--color-base-content)', opacity: '0.8'}}>
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold" style={{color: 'var(--color-base-content)'}}>{testimonial.author}</div>
                    <div className="text-sm" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;