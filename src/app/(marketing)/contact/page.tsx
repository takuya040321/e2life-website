import type { Metadata } from "next";
import Image from "next/image";

import { submitContactForm } from "@/app/actions/contact";
import { ContactForm } from "@/components/shared/contact-form";

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
    <div className="relative mx-auto max-w-2xl px-6 py-20">
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-normal">お問い合わせ</h2>
        <p className="text-muted-foreground mt-2">
          ご質問・ご相談がありましたら、以下のフォームからお気軽にお問い合わせください。
        </p>
      </div>
      <div className="mt-12">
        <ContactForm onSubmit={submitContactForm} />
      </div>
      <Image
        src="/illustrations/hanko-e2life.png"
        alt=""
        width={72}
        height={72}
        className="absolute right-6 bottom-8 hidden opacity-80 sm:block"
        aria-hidden="true"
      />
    </div>
  );
}
