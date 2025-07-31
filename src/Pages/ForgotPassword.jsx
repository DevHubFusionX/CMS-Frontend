import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../Services/api";
import { ForgotPasswordForm } from "../Components/Auth";
import ThemeToggle from "../Components/UI/ThemeToggle";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

const handleForgotPassword = async (formData) => {
  try {
    setLoading(true);
    setError(null);
    setEmail(formData.email);

    await authService.forgotPassword(formData);
    setSuccess(true);
  } catch (err) {
    setError(err.message || "Failed to send password reset email.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex" style={{backgroundColor: 'var(--color-base-100)'}}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', opacity: '0.1'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse" style={{background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)', opacity: '0.1', animationDelay: '2s'}}></div>
      </div>

      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                F
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>Reset Password</h1>
            <p style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Enter your email to receive a password reset link</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl border backdrop-blur-sm"
              style={{backgroundColor: 'var(--color-error)', borderColor: 'var(--color-error)', color: 'var(--color-error-content)', opacity: '0.9'}}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ForgotPasswordForm 
              onSubmit={handleForgotPassword} 
              isLoading={loading}
              success={success}
              error={error}
              email={email}
              onReset={() => {
                setSuccess(false);
                setError(null);
                setEmail('');
              }}
            />
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            className="text-center mt-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/login" className="block transition-colors" style={{color: 'var(--color-primary)'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              ← Back to Login
            </Link>
            <Link to="/" className="block text-sm transition-colors" style={{color: 'var(--color-base-content)', opacity: '0.7'}} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.7'}>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Info */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative" style={{backgroundColor: 'var(--color-base-200)'}}>
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>
            Secure Password Recovery
          </h2>
          <p className="leading-relaxed" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            We'll send you a secure link to reset your password. The link will expire in 1 hour for your security.
          </p>
        </motion.div>
        
        {/* Theme Toggle */}
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
