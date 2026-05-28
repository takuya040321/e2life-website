import type { Metadata } from "next";

import { submitContactForm } from "@/app/actions/contact";
import { ContactForm } from "@/components/shared/contact-form";
import { ReCaptchaProvider } from "@/components/shared/recaptcha-provider";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "お問い合わせフォーム",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ",
    description: "お問い合わせフォーム",
    url: "/contact",
  },
};

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
          <ContactForm onSubmit={submitContactForm} />
        </ReCaptchaProvider>
      </div>
    </div>
  );
}
