"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold mb-4">
        Find Your Perfect Job Match 🚀
      </h1>

      <p className="text-lg text-gray-600 mb-2">
        AI-powered job matching in seconds
      </p>

      <p className="text-gray-500 mb-8 max-w-xl">
        Upload your resume and instantly discover jobs tailored to your skills.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Get Started
          </button>
        </Link>

        <Link href="/jobs">
          <button className="border px-6 py-3 rounded-lg">
            View Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}