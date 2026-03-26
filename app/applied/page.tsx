"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AppliedJobs() {
  const [jobs, setJobs] = useState<any[]>([])

  const jobDetails: any = {
    "1": { title: "Frontend Developer", company: "Google" },
    "2": { title: "Backend Developer", company: "Amazon" },
    "3": { title: "Full Stack Developer", company: "StartupX" },
  }

  useEffect(() => {
    const fetchJobs = async () => {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) return

      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userData.user.id)

      setJobs(data || [])
    }

    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-6">
        Applied Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          🚀 You haven’t applied to any jobs yet  
          <br />
          Go explore jobs and apply!
        </p>
      ) : (
        jobs.map((job, index) => {
          const details = jobDetails[job.job_id]

          return (
            <div key={index} className="bg-white/40 p-5 rounded-xl shadow mb-4">

              <h2 className="text-xl font-semibold">
                {details?.title}
              </h2>

              <p className="text-gray-500">
                {details?.company}
              </p>

              <p className="mt-2 text-green-600">
                Match: {job.match_score}%
              </p>

            </div>
          )
        })
      )}
    </div>
  )
}