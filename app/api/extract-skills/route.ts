export async function POST(req: Request) {
  const { text } = await req.json()

  const skillMap = [
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
  ]

  const skills = skillMap.filter(skill =>
    text.toLowerCase().includes(skill)
  )

  return Response.json({ skills })
}