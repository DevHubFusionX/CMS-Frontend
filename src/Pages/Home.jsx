import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services';
import HubFusionXLoader from '../Components/Common/HubFusionXLoader';
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer
} from '../Components/Home';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--color-base-100)'}}>
        <HubFusionXLoader 
          size="lg" 
          message="Welcome to HubFusionX CMS..." 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: 'var(--color-base-100)'}}>
      <Navigation 
        isScrolled={isScrolled}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <CTASection scrollToSection={scrollToSection} />
      
      <Footer />
    </div>
  );
};

export default Home;