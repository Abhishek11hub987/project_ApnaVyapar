type EnvVar = {
  name: string;
  required: boolean;
  public: boolean;
};

const REQUIRED_VARS: EnvVar[] = [
  { name: 'NEXT_PUBLIC_SUPABASE_URL', required: true, public: true },
  { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true, public: true },
  { name: 'SUPABASE_SERVICE_ROLE_KEY', required: true, public: false },
  { name: 'GROQ_API_KEY', required: true, public: false },
  { name: 'NEXT_PUBLIC_APP_URL', required: false, public: true },
  { name: 'NEXT_PUBLIC_APP_NAME', required: false, public: true },
  { name: 'CRON_SECRET', required: false, public: false },
];

export function validateEnv(): { ok: true } | { ok: false; missing: string[] } {
  const missing: string[] = [];
  for (const v of REQUIRED_VARS) {
    if (v.required && !process.env[v.name]) {
      missing.push(v.name);
    }
  }
  if (missing.length > 0) return { ok: false, missing };
  return { ok: true };
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
