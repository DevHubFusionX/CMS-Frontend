import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LoginForm } from '../Components/Auth'
import { authService, useAuth } from '../Services'
import { HubFusionXLoader } from '../Components/Common'
import ThemeToggle from '../Components/UI/ThemeToggle'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [resendingVerification, setResendingVerification] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleResendVerification = async () => {
    setResendingVerification(true)
    try {
      await authService.resendVerification(userEmail)
      setError('Verification email sent! Please check your inbox.')
    } catch (err) {
      setError(err.message || 'Failed to resend verification email')
    } finally {
      setResendingVerification(false)
    }
  }

  const handleLogin = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Call the login service
      const response = await authService.login(formData)
      
      // Update auth context
      login(response.user)
      
      // Role-based redirect logic
      const userRole = response.user?.legacyRole || response.user?.role?.name || response.user?.role
      console.log('User data:', response.user)
      console.log('User role:', userRole)
      
      if (['admin', 'super_admin', 'editor', 'author', 'contributor'].includes(userRole)) {
        navigate('/dashboard')
      } else if (userRole === 'subscriber') {
        navigate('/subscriber-home')
      } else {
        navigate('/') // fallback to home
      }
    } catch (err) {
      const errorData = err.response?.data
      if (errorData?.needsVerification) {
        setNeedsVerification(true)
        setUserEmail(errorData.email)
        setError(errorData.message)
      } else {
        setError(errorData?.message || 'Failed to login. Please check your credentials.')
      }
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

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
              <div className="relative w-20 h-20">
                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg z-10" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                    F
                  </div>
                </div>
                
                {/* Animated Dots */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px'
                    }}
                    animate={{
                      x: [
                        Math.cos((i * Math.PI) / 4) * 30,
                        Math.cos(((i + 2) * Math.PI) / 4) * 30,
                        Math.cos(((i + 4) * Math.PI) / 4) * 30,
                        Math.cos(((i + 6) * Math.PI) / 4) * 30,
                        Math.cos((i * Math.PI) / 4) * 30
                      ],
                      y: [
                        Math.sin((i * Math.PI) / 4) * 30,
                        Math.sin(((i + 2) * Math.PI) / 4) * 30,
                        Math.sin(((i + 4) * Math.PI) / 4) * 30,
                        Math.sin(((i + 6) * Math.PI) / 4) * 30,
                        Math.sin((i * Math.PI) / 4) * 30
                      ],
                      scale: [1, 0.5, 1, 1.5, 1],
                      opacity: [0.8, 0.3, 0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>Welcome Back</h1>
            <p style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Sign in to your account</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl border backdrop-blur-sm"
              style={{backgroundColor: needsVerification ? 'var(--color-warning)' : 'var(--color-error)', borderColor: needsVerification ? 'var(--color-warning)' : 'var(--color-error)', color: needsVerification ? 'var(--color-warning-content)' : 'var(--color-error-content)', opacity: '0.9'}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={needsVerification ? "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                </svg>
                <div className="flex-1">
                  {error}
                  {needsVerification && (
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => navigate('/verify-otp', { state: { email: userEmail } })}
                        className="w-full py-2 px-4 rounded-lg font-medium transition-all"
                        style={{
                          background: 'var(--color-primary)',
                          color: 'var(--color-primary-content)'
                        }}
                      >
                        Verify Account Now
                      </button>
                      <button
                        onClick={handleResendVerification}
                        disabled={resendingVerification}
                        className="text-sm underline hover:no-underline disabled:opacity-50"
                        style={{color: 'var(--color-warning-content)'}}
                      >
                        {resendingVerification ? 'Sending...' : 'Resend verification code'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <motion.div 
              className="py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <HubFusionXLoader size="lg" message="Signing you in..." />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LoginForm onLogin={handleLogin} />
            </motion.div>
          )}
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
          <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--color-base-content)'}}>
            Advanced Content Management
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            Empowering creators with intelligent tools and seamless workflows
          </p>
          
          <div className="space-y-4">
            {[
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Lightning Fast', desc: 'Optimized performance' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure & Reliable', desc: 'Enterprise-grade security' },
              { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'User Friendly', desc: 'Intuitive design' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-sm"
                style={{backgroundColor: 'var(--color-base-100)', opacity: '0.8'}}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)'}}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold" style={{color: 'var(--color-base-content)'}}>{feature.title}</h3>
                  <p className="text-sm" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Theme Toggle */}
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Login