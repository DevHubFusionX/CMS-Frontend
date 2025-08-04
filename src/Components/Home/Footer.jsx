import React from 'react';
import { BrandLogo } from '../Common';

const Footer = () => {
  return (
    <footer className="border-t" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <BrandLogo size="lg" />
            </div>
            <p className="text-lg leading-relaxed mb-6 max-w-md" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
              The next-generation content management platform built for modern teams who demand excellence.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{backgroundColor: 'var(--color-base-300)', color: 'var(--color-base-content)', opacity: '0.7'}}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary)';
                    e.target.style.color = 'var(--color-primary-content)';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-base-300)';
                    e.target.style.color = 'var(--color-base-content)';
                    e.target.style.opacity = '0.7';
                  }}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6" style={{color: 'var(--color-base-content)'}}>Product</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors duration-300" style={{color: 'var(--color-base-content)', opacity: '0.7'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.7';}}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6" style={{color: 'var(--color-base-content)'}}>Company</h3>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors duration-300" style={{color: 'var(--color-base-content)', opacity: '0.7'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.7';}}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style={{borderColor: 'var(--color-base-300)'}}>
          <p style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
            © 2024 HubFusionx. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="transition-colors duration-300" style={{color: 'var(--color-base-content)', opacity: '0.6'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.6';}}>
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300" style={{color: 'var(--color-base-content)', opacity: '0.6'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.6';}}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;