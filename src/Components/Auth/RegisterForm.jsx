import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedContainer, BrandLogo } from '../Common'
import RoleSelector from './RoleSelector'

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'subscriber'
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'Weak'
      case 2:
      case 3: return 'Medium'
      case 4:
      case 5: return 'Strong'
      default: return 'Weak'
    }
  }

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'text-red-400'
      case 2:
      case 3: return 'text-yellow-400'
      case 4:
      case 5: return 'text-green-400'
      default: return 'text-red-400'
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    

    
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak. Include uppercase, lowercase, numbers, and symbols'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Pass data to parent component for handling registration logic
    onRegister(formData)
  }

  return (
    <div className="modern-login-card max-w-md mx-auto">
      <AnimatedContainer animation="fade-in" duration={800} className="text-center mb-8">
        <BrandLogo size="md" className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Join FusionX</h1>
        <p className="text-gray-400">Create your account and start building</p>
      </AnimatedContainer>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatedContainer animation="slide-left" delay={100}>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Full Name"
            />
            {errors.name && (
              <AnimatedContainer animation="fade-in">
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              </AnimatedContainer>
            )}
        </AnimatedContainer>

        <AnimatedContainer animation="slide-left" delay={150}>
          <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Email Address"
            />
            {errors.email && (
              <AnimatedContainer animation="fade-in">
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              </AnimatedContainer>
            )}
        </AnimatedContainer>

        <AnimatedContainer animation="slide-left" delay={200}>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Confirm"
              />
            </div>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <AnimatedContainer animation="fade-in" className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Password strength:</span>
                <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength)}`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    passwordStrength <= 1 ? 'bg-red-500' :
                    passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </AnimatedContainer>
          )}
          
          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <AnimatedContainer animation="fade-in" className="mt-2">
              <div className="flex items-center">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <svg className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-400 text-sm font-medium">Passwords match</p>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-yellow-400 text-sm font-medium">Passwords don't match</p>
                  </>
                )}
              </div>
            </AnimatedContainer>
          )}
          
          {(errors.password || errors.confirmPassword) && (
            <AnimatedContainer animation="fade-in">
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password || errors.confirmPassword}
              </p>
            </AnimatedContainer>
          )}
        </AnimatedContainer>

        <AnimatedContainer animation="slide-left" delay={250}>
          <label className="block text-sm font-medium text-gray-300 mb-3">Account Type</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'subscriber', label: 'Reader', icon: '👤', desc: 'Basic access' },
              { value: 'contributor', label: 'Contributor', icon: '✍️', desc: 'Submit content' },
              { value: 'author', label: 'Creator', icon: '📝', desc: 'Publish content' }
            ].map((role, index) => (
              <AnimatedContainer key={role.value} animation="fade-in" delay={300 + index * 50}>
                <label
                  className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                    formData.role === role.value
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-2xl mb-1">{role.icon}</span>
                  <span className="text-sm font-medium text-gray-300">{role.label}</span>
                  <span className="text-xs text-gray-500">{role.desc}</span>
                </label>
              </AnimatedContainer>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="slide-up" delay={400}>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              Create Account
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
          </button>
        </AnimatedContainer>
      </form>

      <AnimatedContainer animation="fade-in" delay={500} className="text-center mt-6">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in →
          </Link>
        </p>
      </AnimatedContainer>
      
      <AnimatedContainer animation="fade-in" delay={600} className="text-center mt-4 text-gray-500 text-xs">
        <p>
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
        </p>
      </AnimatedContainer>
    </div>
  );
}

export default RegisterForm
