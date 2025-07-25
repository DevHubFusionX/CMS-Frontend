import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedContainer, BrandLogo } from '../Common'

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Enhanced validation
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Pass data to parent component for handling login logic
    onLogin(formData)
  }

  return (
    <div className="modern-login-card">
      {/* Header Section */}
      <AnimatedContainer
        animation="fade-in"
        duration={800}
        className="text-center mb-10"
      >
        <div className="mb-6">
          <BrandLogo size="lg" className="mb-4" />
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-3 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Sign in to continue your creative journey
        </p>
      </AnimatedContainer>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Email Field */}
        <AnimatedContainer
          animation="slide-left"
          delay={100}
          className="w-full"
        >
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-semibold mb-3 tracking-wide"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`modern-input pl-12 ${
                  errors.email ? "border-red-500 focus:ring-red-500/30" : "border-gray-600 focus:border-blue-500"
                }`}
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-sm font-medium">
                  {errors.email}
                </p>
              </div>
            )}
          </div>
        </AnimatedContainer>

        {/* Password Field */}
        <AnimatedContainer
          animation="slide-left"
          delay={200}
          className="w-full"
        >
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-semibold tracking-wide"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`modern-input pl-12 pr-12 ${
                  errors.password ? "border-red-500 focus:ring-red-500/30" : "border-gray-600 focus:border-blue-500"
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-sm font-medium">
                  {errors.password}
                </p>
              </div>
            )}
          </div>
        </AnimatedContainer>

        {/* Submit Button */}
        <AnimatedContainer animation="slide-up" delay={300} className="w-full pt-2">
          <button type="submit" className="modern-button group">
            <span className="relative z-10 flex items-center justify-center">
              Sign In
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </AnimatedContainer>
      </form>

      {/* Footer */}
      <AnimatedContainer
        animation="fade-in"
        delay={400}
        className="text-center mt-8 pt-6 border-t border-gray-700/50"
      >
        <p className="text-gray-400 text-base">
          New to FusionX?{" "}
          <Link to="/register" className="modern-link group">
            Create an account
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 ml-1">→</span>
          </Link>
        </p>
      </AnimatedContainer>

      {/* Security Badge */}
      <AnimatedContainer
        animation="fade-in"
        delay={500}
        className="flex items-center justify-center mt-6 text-gray-500 text-sm"
      >
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Secured with enterprise-grade encryption</span>
      </AnimatedContainer>
    </div>
  );
}

export default LoginForm
