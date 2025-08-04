import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../Services'
import { useNotification } from '../Context/NotificationContext'
import { HubFusionxLoader } from '../Components/Common'

const VerifyOTP = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  
  const email = location.state?.email || ''

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      showNotification('Please enter a valid 6-digit OTP', 'error')
      return
    }

    setLoading(true)
    try {
      await authService.verifyOTP(email, otp)
      showNotification('Email verified successfully! You can now log in.', 'success')
      navigate('/login')
    } catch (error) {
      showNotification(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResending(true)
    try {
      await authService.resendVerification(email)
      showNotification('New OTP sent to your email!', 'success')
    } catch (error) {
      showNotification(error.message, 'error')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="max-w-md w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)'}}>
            <svg className="w-8 h-8" style={{color: 'var(--color-primary-content)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>Verify Your Email</h1>
          <p className="mb-6" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            We've sent a 6-digit OTP to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
                maxLength={6}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'var(--color-primary-content)'
              }}
            >
              {loading ? <HubFusionxLoader size="sm" /> : 'Verify OTP'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm mb-2" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
              Didn't receive the OTP?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="text-sm font-medium hover:opacity-80 disabled:opacity-50"
              style={{color: 'var(--color-primary)'}}
            >
              {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VerifyOTP