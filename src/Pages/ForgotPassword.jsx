import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../Components/Auth";
import { authService } from "../Services/api";
import { AnimatedContainer, CodeAnimation, BrandLogo } from "../Components/Common";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleForgotPassword = async (formData) => {
  try {
    setLoading(true);
    setError(null);

    // Call the forgot password service
    await authService.forgotPassword(formData);
    
    // No need to navigate - the form will show a success message
  } catch (err) {
    setError("Failed to send password reset email. Please check your network connection.");
    console.error("Reset password error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="split-screen-container">
      {/* Back to Home Link */}
      {/* <AuthHeader /> */}

      {/* Left Panel - Login Form */}
      <div className="split-screen-left z-100">
        {error && (
          <AnimatedContainer
            animation="fade-in"
            className=" absolute top-1 left-0 right-0 mx-auto w-full max-w-md px-4"
          >
            <div
              className="bg-red-900/80 border border-red-700 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          </AnimatedContainer>
        )}

        {loading ? (
          <AnimatedContainer animation="fade-in" className="tech-card">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-100 font-medium text-center text-xl">
              Processing...
            </p>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Please wait while we send the reset link
            </p>
          </AnimatedContainer>
        ) : (
          <AnimatedContainer animation="slide-up" className="w-full max-w-md">
            <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={loading} />
          </AnimatedContainer>
        )}
      </div>

      {/* Right Panel - Animation */}
      <div className="split-screen-right">
        <CodeAnimation />

        <div className="relative z-10 text-center p-8">
          <AnimatedContainer animation="fade-in" delay={300} className="mb-8">
            <BrandLogo size="xl" className="mb-4" />
            <p className="text-gray-300 text-lg">
              Advanced Content Management System
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-in" delay={600} className="mt-12">
            <div className="relative w-full max-w-md mx-auto h-64 rounded-lg overflow-hidden border border-gray-700/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50 animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-300 font-medium">
                    Powerful Developer Tools
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Streamline your workflow with our advanced CMS
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
}

export default ForgotPassword
