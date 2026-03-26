"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleUpload = async () => {
    if (!file) {
      toast.error("Upload a file")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload-resume", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setSkills(data.skills)

    // ✅ REAL USER
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      toast.error("Login required")
      setLoading(false)
      return
    }

    // ✅ UPSERT (NO DUPLICATE)
    await supabase.from("users").upsert(
      {
        email: userData.user.email,
        name: userData.user.email,
        skills: data.skills,
      },
      { onConflict: "email" }
    )

    toast.success("Skills saved!")
    setLoading(false)

    router.push("/jobs")
  }

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Upload Resume 🚀
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full border p-2 rounded-lg"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Analyze Resume"}
        </button>

        {skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-blue-200 px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}