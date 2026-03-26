"use client"

import JobCard from "@/components/JobCard"
import { calculateMatch, getMissingSkills } from "@/utils/match"

export default function JobsPage() {
  const userSkills = ["react", "node", "mongodb"]

  const jobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company_name: "Google",
      required_skills: ["react", "javascript", "css"],
    },
    {
      id: "2",
      title: "Backend Developer",
      company_name: "Amazon",
      required_skills: ["node", "mongodb", "express"],
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company_name: "StartupX",
      required_skills: ["react", "node", "mongodb"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Matched Jobs
      </h1>

      <div className="max-w-3xl mx-auto">
        {jobs.map((job) => {
          const match = calculateMatch(
            userSkills,
            job.required_skills
          )

          const missing = getMissingSkills(
            userSkills,
            job.required_skills
          )

          return (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company_name}
              skills={job.required_skills}
              match={match}
              missing={missing}
            />
          )
        })}
      </div>
    </div>
  )
}