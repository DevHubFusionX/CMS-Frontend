import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services';
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

  // Redirect authenticated users based on role
  useEffect(() => {
    if (user) {
      const userRole = user?.legacyRole || user?.role?.name || user?.role;
      if (['admin', 'super_admin', 'editor', 'author', 'contributor'].includes(userRole)) {
        navigate('/dashboard');
      } else if (userRole === 'subscriber') {
        navigate('/subscriber-home');
      }
    }
  }, [user, navigate]);

  useEffect(() => {
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
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden">
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