"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // ✅ Get current session
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    // ✅ Listen to auth changes (IMPORTANT)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/40 border-b shadow-lg">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          BRIDGEX
        </h1>

        <div className="flex items-center gap-6">

          <Link href="/dashboard">Dashboard</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/applied">Applied</Link>

          {!user ? (
            <Link href="/auth">Login</Link>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}