import React from 'react'
import { Link } from 'react-router-dom'
import { AnimatedContainer, BrandLogo } from '../Components/Common'

const Register = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <AnimatedContainer animation="fade-in" className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
          <BrandLogo size="lg" className="mb-6" />
          
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-2xl font-bold text-white mb-2">Registration Restricted</h1>
            <p className="text-gray-300 mb-4">
              Account creation is managed by administrators only.
            </p>
            <p className="text-gray-400 text-sm">
              If you need access, please contact your administrator to create an account for you.
            </p>
          </div>
          
          <Link 
            to="/login" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Go to Login
          </Link>
        </div>
      </AnimatedContainer>
    </div>
  )
}

export default Register
