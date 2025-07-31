import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RegisterForm } from '../Components/Auth'
import { authService } from '../Services'
import { useAuth } from '../Services/AuthContext'
import { useNotification } from '../Context/NotificationContext'
import { FusionXLoader } from '../Components/Common'
import ThemeToggle from '../Components/UI/ThemeToggle'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showNotification } = useNotification()

  const handleRegister = async (formData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      
      showNotification(response.message || 'Registration successful! Please check your email for the OTP.', 'success')
      navigate('/verify-otp', { state: { email: response.email || formData.email } })
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.')
      showNotification(error.message || 'Registration failed. Please try again.', 'error')
    } finally {
      setIsLoading(false)
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
            <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>Join FusionX</h1>
            <p style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Create your account and start building</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl border backdrop-blur-sm"
              style={{backgroundColor: 'var(--color-error)', borderColor: 'var(--color-error)', color: 'var(--color-error-content)', opacity: '0.9'}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <motion.div 
              className="py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FusionXLoader size="lg" message="Creating your account..." />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RegisterForm onRegister={handleRegister} />
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
            Start Your Journey
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            Join thousands of creators building amazing content with FusionX CMS
          </p>
          
          <div className="space-y-4">
            {[
              { icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z', title: 'Create Content', desc: 'Rich editor with AI assistance' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: 'Collaborate', desc: 'Work together seamlessly' },
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Analytics', desc: 'Track your content performance' }
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

export default Register
