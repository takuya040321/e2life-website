"use server";

import { env } from "@/lib/env";
import { sendContactEmail } from "@/lib/utils/email";
import { verifyRecaptcha } from "@/lib/utils/recaptcha";
import type { ContactFormData } from "@/lib/validations/contact";
import { contactFormSchema } from "@/lib/validations/contact";

export type ActionResult = { success: true; message: string } | { success: false; error: string };

export async function submitContactForm(
  formData: ContactFormData,
  recaptchaToken: string,
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "入力内容に誤りがあります。" };
  }

  const recaptcha = await verifyRecaptcha(
    recaptchaToken,
    env.RECAPTCHA_SECRET_KEY,
    env.RECAPTCHA_MIN_SCORE,
  );

  if (!recaptcha.ok && recaptcha.reason !== "no-secret") {
    return { success: false, error: "送信に失敗しました。もう一度お試しください。" };
  }

  const emailResult = await sendContactEmail({
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_EMAIL,
    from: env.RESEND_FROM_EMAIL,
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    message: parsed.data.message,
  });

  if (!emailResult.ok) {
    return { success: false, error: "送信に失敗しました。時間を置いてお試しください。" };
  }

  return {
    success: true,
    message: "お問い合わせを送信しました。ご連絡ありがとうございます。",
  };
}
