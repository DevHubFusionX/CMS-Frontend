import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../Components/Auth'
import { authService, useAuth } from '../Services'
import { AnimatedContainer, CodeAnimation, BrandLogo, AuthHeader } from '../Components/Common'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

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
      
      if (['admin', 'super_admin', 'editor', 'author', 'contributor'].includes(userRole)) {
        navigate('/dashboard')
      } else if (userRole === 'subscriber') {
        navigate('/subscriber-home')
      } else {
        navigate('/') // fallback to home
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="split-screen-container">
      {/* Back to Home Link */}
      {/* <AuthHeader /> */}
      
      {/* Left Panel - Login Form */}
      <div className="split-screen-left z-100">
        {error && (
          <AnimatedContainer animation="fade-in" className=" absolute top-1 left-0 right-0 mx-auto w-full max-w-md px-4">
            <div className="bg-red-900/80 border border-red-700 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          </AnimatedContainer>
        )}
        
        {loading ? (
          <AnimatedContainer animation="fade-in" className="tech-card">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-100 font-medium text-center text-xl">Logging in...</p>
            <p className="text-gray-400 text-sm mt-2 text-center">Please wait while we verify your credentials</p>
          </AnimatedContainer>
        ) : (
          <AnimatedContainer animation="slide-up" className="w-full max-w-md">
            <LoginForm onLogin={handleLogin} />
          </AnimatedContainer>
        )}
      </div>
      
      {/* Right Panel - Enhanced Animation */}
      <div className="split-screen-right">
        <CodeAnimation />
        
        <div className="relative z-10 text-center p-8 max-w-lg mx-auto">
          <AnimatedContainer animation="fade-in" delay={300} className="mb-12">
            <BrandLogo size="xl" className="mb-6" />
            <h2 className="text-2xl font-bold text-gray-200 mb-3">
              Advanced Content Management
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Empowering creators with intelligent tools and seamless workflows
            </p>
          </AnimatedContainer>
          
          {/* Feature Cards */}
          <div className="space-y-6">
            <AnimatedContainer animation="fade-in" delay={600}>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-blue-300 font-semibold text-lg">Lightning Fast</h3>
                    <p className="text-gray-400 text-sm">Optimized performance for modern web</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={800}>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-purple-300 font-semibold text-lg">Secure & Reliable</h3>
                    <p className="text-gray-400 text-sm">Enterprise-grade security standards</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={1000}>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-600/10 to-green-800/10 border border-green-500/20 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-green-300 font-semibold text-lg">User Friendly</h3>
                    <p className="text-gray-400 text-sm">Intuitive design for all skill levels</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
          
          {/* Stats */}
          <AnimatedContainer animation="fade-in" delay={1200} className="mt-12">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">99.9%</div>
                <div className="text-gray-500 text-sm">Uptime</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-400 mb-1">10k+</div>
                <div className="text-gray-500 text-sm">Users</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
                <div className="text-gray-500 text-sm">Support</div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
        
        {/* Enhanced Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  )
}

export default Login
