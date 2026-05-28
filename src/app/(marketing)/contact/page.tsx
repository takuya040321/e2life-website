import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "お問い合わせフォーム",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-bold">お問い合わせ</h1>
      <p className="text-foreground/70 mt-4">
        ご質問・ご相談がありましたら、以下のフォームからお気軽にお問い合わせください。
      </p>
      <div className="border-foreground/10 mt-8 rounded-lg border p-6">
        <p className="text-foreground/50 text-sm">
          フォームは準備中です。お急ぎの場合は GitHub からご連絡ください。
        </p>
      </div>
    </div>
  );
}
