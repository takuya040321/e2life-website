type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type RecaptchaResult =
  | { ok: true; score: number }
  | { ok: false; reason: "no-secret" | "low-score" | "verify-failed" };

export async function verifyRecaptcha(
  token: string,
  secretKey: string | undefined,
  minScore: number,
): Promise<RecaptchaResult> {
  if (!secretKey) {
    return { ok: false, reason: "no-secret" };
  }

  const params = new URLSearchParams({ secret: secretKey, response: token });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    return { ok: false, reason: "verify-failed" };
  }

  const data = (await response.json()) as RecaptchaVerifyResponse;
  if (!data.success) {
    return { ok: false, reason: "verify-failed" };
  }

  const score = data.score ?? 0;
  if (score < minScore) {
    return { ok: false, reason: "low-score" };
  }

  return { ok: true, score };
}
