import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils/recaptcha", () => ({
  verifyRecaptcha: vi.fn(),
}));

vi.mock("@/lib/utils/email", () => ({
  sendContactEmail: vi.fn(),
}));

import { submitContactForm } from "./contact";
import { sendContactEmail } from "@/lib/utils/email";
import { verifyRecaptcha } from "@/lib/utils/recaptcha";

const verifyRecaptchaMock = vi.mocked(verifyRecaptcha);
const sendContactEmailMock = vi.mocked(sendContactEmail);

afterEach(() => {
  vi.clearAllMocks();
});

const validFormData = {
  name: "テスト太郎",
  email: "test@example.com",
  company: "テスト株式会社",
  message: "問い合わせメッセージです。",
};

describe("submitContactForm", () => {
  it("returns error when validation fails", async () => {
    const result = await submitContactForm({ ...validFormData, email: "invalid" }, "token");
    expect(result).toEqual({ success: false, error: "入力内容に誤りがあります。" });
  });

  it("returns error when reCAPTCHA score is low", async () => {
    verifyRecaptchaMock.mockResolvedValueOnce({ ok: false, reason: "low-score" });

    const result = await submitContactForm(validFormData, "token");
    expect(result.success).toBe(false);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("proceeds to send email when reCAPTCHA secret is missing (dev fallback)", async () => {
    verifyRecaptchaMock.mockResolvedValueOnce({ ok: false, reason: "no-secret" });
    sendContactEmailMock.mockResolvedValueOnce({ ok: true });

    const result = await submitContactForm(validFormData, "token");
    expect(result.success).toBe(true);
    expect(sendContactEmailMock).toHaveBeenCalled();
  });

  it("returns success when email sends successfully", async () => {
    verifyRecaptchaMock.mockResolvedValueOnce({ ok: true, score: 0.9 });
    sendContactEmailMock.mockResolvedValueOnce({ ok: true });

    const result = await submitContactForm(validFormData, "token");
    expect(result.success).toBe(true);
  });

  it("returns error when email send fails", async () => {
    verifyRecaptchaMock.mockResolvedValueOnce({ ok: true, score: 0.9 });
    sendContactEmailMock.mockResolvedValueOnce({ ok: false, error: "send failed" });

    const result = await submitContactForm(validFormData, "token");
    expect(result.success).toBe(false);
  });
});
