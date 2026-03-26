export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const text = buffer.toString("utf-8").toLowerCase()

    const skillList = [
      "react",
      "node",
      "mongodb",
      "javascript",
      "python",
      "django",
      "aws",
      "docker",
      "postgresql",
      "tailwind",
      "css",
      "html",
      "express",
      "java",
      "c++",
      "sql",
    ]

    const skills = skillList.filter(skill =>
      text.includes(skill)
    )

    return Response.json({ skills })
  } catch (error) {
    console.error("API ERROR:", error)

    return Response.json(
      { error: "Failed to process resume" },
      { status: 500 }
    )
  }
}