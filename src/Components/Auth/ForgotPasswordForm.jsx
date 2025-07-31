import React, { useState } from "react";
import { motion } from "framer-motion";

const ForgotPasswordForm = ({ onSubmit, isLoading = false, success, error, email, onReset }) => {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: emailInput });
  };

  // Success Animation Component
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
        Reset Link Sent!
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
        style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
      >
        We've sent a password reset link to <strong>{email}</strong>. 
        Please check your email and click the link to reset your password.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-sm p-4 rounded-lg mb-6"
        style={{ backgroundColor: 'var(--color-base-300)', color: 'var(--color-base-content)', opacity: '0.8' }}
      >
        💡 The link will expire in 10 minutes for security reasons
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        onClick={onReset}
        className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--color-base-content)',
          borderColor: 'var(--color-base-300)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send Another Email
      </motion.button>
    </motion.div>
  );

  // Error Animation Component
  const ErrorAnimation = () => (
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
        style={{ backgroundColor: 'var(--color-error)' }}
      >
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="w-10 h-10"
          fill="none"
          stroke="var(--color-error-content)"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </motion.svg>
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-2xl font-bold mb-4"
        style={{ color: 'var(--color-base-content)' }}
      >
        Failed to Send Email
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
        style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
      >
        {error}
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        onClick={onReset}
        className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-content)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  );

  return (
    <div className="w-full backdrop-blur-sm rounded-3xl shadow-xl border p-8" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
      {success ? (
        <SuccessAnimation />
      ) : error ? (
        <ErrorAnimation />
      ) : (
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold mb-3" style={{color: 'var(--color-base-content)'}}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
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
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 px-6 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </motion.form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;