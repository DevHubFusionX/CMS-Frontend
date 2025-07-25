import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email });
    setEmailSent(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-gray-400">
          {!emailSent
            ? "Enter your email to receive a password reset link"
            : "Check your email for reset instructions"}
        </p>
      </div>

      {!emailSent ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-gray-300 mb-4">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-gray-400 text-sm">
            Didn't receive an email? Check your spam folder or{" "}
            <button
              onClick={() => setEmailSent(false)}
              className="text-blue-400 hover:text-blue-300"
            >
              try again
            </button>
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
