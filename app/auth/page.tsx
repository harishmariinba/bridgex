"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "@/components/Loader"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error("Check your email & password OR confirm email first")
      } else {
        toast.success("Welcome back!")
        router.push("/dashboard")
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Account created! Check your email to confirm.")
        setIsLogin(true)
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">

      <div className="bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">

        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        <p className="text-center text-black-800 mb-6">
          {isLogin
            ? "Login to continue"
            : "Sign up & verify your email"}
        </p>

        <input
          className="border p-3 w-full mb-3 rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 w-full mb-4 rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg"
        >
          {loading ? <Loader /> : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  )
}