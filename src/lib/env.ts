function getEnv(name: string): string | undefined {
  return process.env[name];
}

export const env = {
  RECAPTCHA_SECRET_KEY: getEnv("RECAPTCHA_SECRET_KEY"),
  RECAPTCHA_MIN_SCORE: Number(getEnv("RECAPTCHA_MIN_SCORE") ?? "0.5"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  CONTACT_EMAIL: getEnv("CONTACT_EMAIL"),
  RESEND_FROM_EMAIL: getEnv("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev",
} as const;
