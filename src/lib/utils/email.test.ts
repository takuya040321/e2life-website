import { describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { sendContactEmail } from "./email";

describe("sendContactEmail", () => {
  it("returns ok and logs when API key is missing", async () => {
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = await sendContactEmail({
      apiKey: undefined,
      to: "to@example.com",
      from: "from@example.com",
      name: "テスト太郎",
      email: "test@example.com",
      message: "テストメッセージ",
    });
    expect(result).toEqual({ ok: true });
    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  it("calls Resend.send with formatted body when API key is provided", async () => {
    sendMock.mockResolvedValueOnce({ data: { id: "email-1" }, error: null });

    const result = await sendContactEmail({
      apiKey: "resend-key",
      to: "to@example.com",
      from: "from@example.com",
      name: "テスト太郎",
      email: "test@example.com",
      company: "テスト株式会社",
      message: "テストメッセージ",
    });

    expect(result).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "from@example.com",
        to: "to@example.com",
        replyTo: "test@example.com",
        subject: "お問い合わせ: テスト太郎様より",
      }),
    );
  });

  it("returns error when Resend send fails", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "API error" } });

    const result = await sendContactEmail({
      apiKey: "resend-key",
      to: "to@example.com",
      from: "from@example.com",
      name: "テスト太郎",
      email: "test@example.com",
      message: "テストメッセージ",
    });

    expect(result).toEqual({ ok: false, error: "API error" });
  });
});
