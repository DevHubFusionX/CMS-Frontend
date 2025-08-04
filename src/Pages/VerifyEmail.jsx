import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HubFusionxLoader } from '../Components/Common'
import api from '../Services/apiClient'

const VerifyEmail = () => {
  const { token } = useParams()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`)
        setStatus('success')
        setMessage(response.data.message)
      } catch (error) {
        setStatus('error')
        setMessage(error.response?.data?.message || 'Email verification failed')
      }
    }

    if (token) {
      verifyEmail()
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="max-w-md w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {status === 'verifying' && (
            <div>
              <HubFusionxLoader size="lg" message="Verifying your email..." />
            </div>
          )}

          {status === 'success' && (
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-success)'}}>
                <svg className="w-8 h-8" style={{color: 'var(--color-success-content)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>Email Verified!</h1>
              <p className="mb-6" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>{message}</p>
              <Link 
                to="/login" 
                className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-primary-content)'
                }}
              >
                Continue to Login
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-error)'}}>
                <svg className="w-8 h-8" style={{color: 'var(--color-error-content)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>Verification Failed</h1>
              <p className="mb-6" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>{message}</p>
              <Link 
                to="/login" 
                className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-primary-content)'
                }}
              >
                Back to Login
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default VerifyEmail