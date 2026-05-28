import type { Metadata } from "next";

import { ContactForm } from "@/components/shared/contact-form";
import { ReCaptchaProvider } from "@/components/shared/recaptcha-provider";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "お問い合わせフォーム",
};

async function handleContactSubmit(): Promise<
  { success: true; message: string } | { success: false; error: string }
> {
  "use server";
  return {
    success: true,
    message: "送信機能は次の実装ステップで完成します（プレースホルダー）",
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <SectionHeading
        title="お問い合わせ"
        description="ご質問・ご相談がありましたら、以下のフォームからお気軽にお問い合わせください。"
        align="left"
      />
      <div className="mt-12">
        <ReCaptchaProvider>
          <ContactForm onSubmit={handleContactSubmit} />
        </ReCaptchaProvider>
      </div>
    </div>
  );
}
