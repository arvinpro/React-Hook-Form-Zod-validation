"use client";

import { Mail, Lock, Calendar, Phone, MapPin, User } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "./ui/Spinner";


const registerSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .refine((val) => val.endsWith("@gmail.com"), {
        message: "Email must be Gmail Address",
      }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: z.string(),
    dob: z.string().min(1, "Date of birth is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"], "Select a gender"),
    address: z.string().min(5, "Address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;


const getPasswordStrength = (password: string) => {
  if (!password) return ""; 

  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 2) return "weak";
  if (strength === 3 || strength === 4) return "medium";
  if (strength === 5) return "strong";

  return "weak";
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchPassword = watch("password", "");

  const onSubmit = (data: RegisterFormData) => {
    try {
      console.log("Form Data:", data);
      toast.success("Registration is Completed!");
      reset();
      setPasswordStrength("");
    } catch (error) {
      toast.error("Registration failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT ILLUSTRATION */}
        <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 items-center justify-center p-8 text-white">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Join Jimdar Tech</h1>
            <p className="text-blue-100 text-sm">Create your account and start your journey with us.</p>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded"></div>
            </div>
            <span className="text-xl font-bold text-gray-800">Jimdar Tech</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h2>
          <p className="text-gray-600 text-sm mb-6">Please fill in your details below.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="min-h-5 text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => {
                  setPasswordStrength(getPasswordStrength(e.target.value));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {passwordStrength && !errors.password && (
                <p
                  className={`text-sm mt-1 font-medium ${
                    passwordStrength === "weak"
                      ? "text-red-500"
                      : passwordStrength === "medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  Password Strength: {passwordStrength.toUpperCase()}
                </p>
              )}
              <p className="min-h- text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
              <p className="min-h- text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* DOB */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                {...register("dob")}
                aria-invalid={errors.dob ? "true" : "false"}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="min-h- text-red-500 text-sm mt-1">
                {errors.dob?.message}
              </p>
            </div>

            {/* PHONE */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="min-h- text-red-500 text-sm mt-1">
                {errors.phone?.message}
              </p>
            </div>

            {/* GENDER */}
            <select
              {...register("gender")}
              aria-invalid={errors.gender ? "true" : "false"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="min-h- text-red-500 text-sm mt-1">
              {errors.gender?.message}
            </p>

            {/* ADDRESS */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                placeholder="Full Address"
                {...register("address")}
                rows={3}
                aria-invalid={errors.address ? "true" : "false"}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="min-h- text-red-500 text-sm mt-1">
                {errors.address?.message}
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              {isSubmitting ? <Spinner /> : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
