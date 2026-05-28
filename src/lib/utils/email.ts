import { Resend } from "resend";

type SendContactEmailInput = {
  apiKey: string | undefined;
  to: string | undefined;
  from: string;
  name: string;
  email: string;
  company?: string;
  message: string;
};

export type SendEmailResult = { ok: true } | { ok: false; error: string };

export async function sendContactEmail(input: SendContactEmailInput): Promise<SendEmailResult> {
  const { apiKey, to, from, name, email, company, message } = input;

  if (!apiKey || !to) {
    // ローカル開発時のフォールバック: メール内容をログ出力
    console.log("[contact-form] (API キー未設定のため送信スキップ)", {
      from,
      to,
      name,
      email,
      company,
      message,
    });
    return { ok: true };
  }

  const resend = new Resend(apiKey);

  const subject = `お問い合わせ: ${name}様より`;
  const body = [
    `お名前: ${name}`,
    `メールアドレス: ${email}`,
    `会社名: ${company ?? "（未記入）"}`,
    "",
    "メッセージ:",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text: body,
    replyTo: email,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
