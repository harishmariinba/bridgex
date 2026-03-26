"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function JobCard({
  id,
  title,
  company,
  skills,
  match,
  missing,
}: any) {

  const [userId, setUserId] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(false)

  const logos: any = {
    Google: "https://logo.clearbit.com/google.com",
    Amazon: "https://logo.clearbit.com/amazon.com",
    StartupX: "https://logo.clearbit.com/vercel.com",
  }

  useEffect(() => {
    const getUserAndCheck = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (!user) return

      setUserId(user.id)

      const { data: existing } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", String(id))

      if (existing && existing.length > 0) {
        setApplied(true)
      }
    }

    getUserAndCheck()
  }, [id])

  const applyJob = async () => {
    if (!userId) {
      toast.error("Login required")
      return
    }

    if (applied) {
      toast("Already applied")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("applications").insert([
      {
        user_id: userId,
        job_id: String(id),
        match_score: match,
      },
    ])

    setLoading(false)

    if (error) {
      toast.error("Apply failed")
    } else {
      toast.success("Applied 🚀")
      setApplied(true)
    }
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl mb-6">

      <div className="flex items-center gap-3 mb-2">
        <img src={logos[company]} className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-500 text-sm">{company}</p>
        </div>
      </div>

      <p className="text-sm mt-2">
        <strong>Required:</strong> {skills.join(", ")}
      </p>

      <p className="mt-2 text-green-600 font-semibold">
        Match: {match}%
      </p>

      {missing.length > 0 && (
        <p className="text-red-500 text-sm">
          Missing: {missing.join(", ")}
        </p>
      )}

      <button
        onClick={applyJob}
        disabled={applied || loading}
        className={`mt-4 w-full py-2 rounded-lg text-white ${
          applied
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Applying..." : applied ? "Applied ✓" : "Apply"}
      </button>
    </div>
  )
}