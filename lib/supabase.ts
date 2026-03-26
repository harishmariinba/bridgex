
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xsdxluhlvufewdzllltc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZHhsdWhsdnVmZXdkemxsbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNDg3MDEsImV4cCI6MjA4OTkyNDcwMX0.DGAOqb0eBB8Ag772xQNrsoRuVEAE7LNKZV_UtzqtRi8"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)