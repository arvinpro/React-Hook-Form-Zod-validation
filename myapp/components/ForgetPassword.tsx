'use client';

import { Mail, ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

  const router = useRouter();

  return (
    <div className="h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800">Jimdar Tech</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-600 mb-8">
            Enter your registered email and we’ll send you a reset link.
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
            onClick={()=>router.push('/login')}
              className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium mx-auto"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Back to Login
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="w-60 h-60 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex items-center justify-center">
                <Mail className="w-16 h-16 text-white/80" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Reset your password easily
            </h3>
            <p className="text-blue-100 text-lg">
              We’ll guide you through the steps securely.
            </p>

            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
