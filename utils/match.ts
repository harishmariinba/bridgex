export function calculateMatch(userSkills: string[], jobSkills: string[]) {
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase())

  const matched = jobSkills.filter(skill =>
    normalizedUserSkills.includes(skill.toLowerCase())
  )

  // NEW: give partial weight if at least 1 match
  const baseScore = (matched.length / jobSkills.length) * 100

  // boost score slightly if at least one skill matches
  const bonus = matched.length > 0 ? 10 : 0

  const finalScore = Math.min(baseScore + bonus, 100)

  return Math.round(finalScore)
}

export function getMissingSkills(userSkills: string[], jobSkills: string[]) {
  const normalizedUserSkills = new Set(userSkills.map(skill => skill.toLowerCase()))

  return jobSkills
    .filter(skill => !normalizedUserSkills.has(skill.toLowerCase()))
    .map(skill => skill.trim())
}