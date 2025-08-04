import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Enhanced validation
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }
    
    try {
      // Pass data to parent component for handling login logic
      await onLogin(formData)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full backdrop-blur-sm rounded-3xl shadow-xl border p-8" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-3" style={{color: 'var(--color-base-content)'}}>
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: 'var(--color-base-content)', opacity: '0.5'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--color-base-100)',
                borderColor: errors.email ? 'var(--color-error)' : 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px var(--color-primary)' + '40';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? 'var(--color-error)' : 'var(--color-base-300)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <motion.div 
              className="mt-2 flex items-center text-sm"
              style={{color: 'var(--color-error)'}}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email}
            </motion.div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="password" className="text-sm font-semibold" style={{color: 'var(--color-base-content)'}}>
              Password
            </label>
            <Link to="/forgot-password" className="text-sm font-medium transition-colors" style={{color: 'var(--color-primary)'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: 'var(--color-base-content)', opacity: '0.5'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--color-base-100)',
                borderColor: errors.password ? 'var(--color-error)' : 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px var(--color-primary)' + '40';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? 'var(--color-error)' : 'var(--color-base-300)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
              style={{color: 'var(--color-base-content)', opacity: '0.5'}}
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.5'}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                )}
              </svg>
            </button>
          </div>
          {errors.password && (
            <motion.div 
              className="mt-2 flex items-center text-sm"
              style={{color: 'var(--color-error)'}}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.password}
            </motion.div>
          )}
        </div>

        <motion.button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 px-6 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </motion.button>
      </form>

      <div className="text-center mt-8">
        <p style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
          New to HubFusionx?{" "}
          <Link to="/register" className="font-semibold transition-colors" style={{color: 'var(--color-primary)'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm