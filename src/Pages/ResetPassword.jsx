import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../Services/api";
import ThemeToggle from "../Components/UI/ThemeToggle";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await authService.resetPassword({ token, password });
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const SuccessAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-success)' }}
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-10 h-10"
          fill="none"
          stroke="var(--color-success-content)"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-2xl font-bold mb-4"
        style={{ color: 'var(--color-base-content)' }}
      >
        Password Reset Successful!
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
        style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
      >
        Your password has been updated successfully.
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-sm"
        style={{ color: 'var(--color-base-content)', opacity: '0.6' }}
      >
        Redirecting to login page...
      </motion.p>
    </motion.div>
  );

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
            <p style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Enter your new password below</p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full backdrop-blur-sm rounded-3xl shadow-xl border p-8"
            style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}
          >
            {success ? (
              <SuccessAnimation />
            ) : (
              <>
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

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold mb-3" style={{color: 'var(--color-base-content)'}}>
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: 'var(--color-base-100)',
                        borderColor: 'var(--color-base-300)',
                        color: 'var(--color-base-content)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-primary)';
                        e.target.style.boxShadow = '0 0 0 3px var(--color-primary)' + '40';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-base-300)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Enter new password"
                      required
                      minLength="6"
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-3" style={{color: 'var(--color-base-content)'}}>
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: 'var(--color-base-100)',
                        borderColor: 'var(--color-base-300)',
                        color: 'var(--color-base-content)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-primary)';
                        e.target.style.boxShadow = '0 0 0 3px var(--color-primary)' + '40';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-base-300)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Confirm new password"
                      required
                      minLength="6"
                      disabled={loading}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: 'var(--color-success)',
                      color: 'var(--color-success-content)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </motion.button>
                </form>
              </>
            )}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>
            Almost Done!
          </h2>
          <p className="leading-relaxed" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            Choose a strong password that you haven't used before. Your new password will be active immediately after confirmation.
          </p>
        </motion.div>
        
        {/* Theme Toggle */}
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;