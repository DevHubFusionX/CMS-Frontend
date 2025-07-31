import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Services';

const Newsletter = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 5000);
      return;
    }
    // Handle subscription logic
    console.log('Subscribing user:', user.email);
  };
  return (
    <section className="mt-20 rounded-3xl p-8 md:p-12 text-center" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)', color: 'var(--color-primary-content)'}}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color: 'var(--color-primary-content)', opacity: '0.9'}}>
        Get the latest articles and insights delivered straight to your inbox
      </p>
      <div className="max-w-md mx-auto">
        {user ? (
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <input
              type="email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-4"
              style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)'}}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px var(--color-primary)' + '40'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              disabled
            />
            <button type="submit" className="px-6 py-3 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-primary)'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-100)'}>
              Subscribe
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="flex gap-4 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-4 opacity-50 cursor-not-allowed"
                style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)'}}
                disabled
              />
              <button 
                onClick={() => {
                  setShowLoginPrompt(true);
                  setTimeout(() => setShowLoginPrompt(false), 5000);
                }}
                className="px-6 py-3 rounded-lg font-semibold transition-colors" 
                style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-primary)'}} 
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'} 
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-100)'}
              >
                Subscribe
              </button>
            </div>
            {showLoginPrompt && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-4">
                Please <Link to="/login" className="font-semibold underline">sign in</Link> or <Link to="/register" className="font-semibold underline">create an account</Link> to subscribe to our newsletter.
              </div>
            )}
            <p className="text-sm" style={{color: 'var(--color-primary-content)', opacity: '0.8'}}>
              <Link to="/register" className="underline hover:no-underline">Create a free account</Link> to subscribe and get personalized content recommendations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;