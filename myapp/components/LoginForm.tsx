"use client";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./ui/Spinner";

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Email must be Gmail Address",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type loginFormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

   const onSubmit = (data: loginFormData) => {
    try {
      console.log("Login Data:", data);
      toast.success("Login Successful!");
      reset();
      router.push("/dashboard"); // redirect after login
    } catch (error) {
      toast.error("Login Failed. Try again!");
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Jimdar Tech
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Log in to your Account
          </h2>
          <p className="text-gray-600 mb-8">
            Welcome back! Select method to log in:
          </p>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="min-h-5 text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-6" /> : <Eye className="w-5 h-5" /> }
            </button>
            <p className="min-h-5 text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button
              onClick={() => router.push("/forgetpassword")}
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </button>
        </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>

            <button
              onClick={() => router.push("/register")}
              className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              Register
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
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                      <div className="flex-1 h-3 bg-white/60 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                      <div className="flex-1 h-3 bg-white/60 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                      <div className="flex-1 h-3 bg-white/60 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>

                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Connect with Jimdar Tech.
            </h3>
            <p className="text-blue-100 text-lg">
              Everything you need is full of passion and interest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
