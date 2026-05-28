import { describe, expect, it } from "vitest";

import { contactFormSchema } from "./contact";

describe("contactFormSchema", () => {
  it("validates a complete valid form", () => {
    const result = contactFormSchema.safeParse({
      name: "テスト太郎",
      email: "test@example.com",
      company: "テスト株式会社",
      message: "お問い合わせ内容をここに記入します。",
    });
    expect(result.success).toBe(true);
  });

  it("allows empty company", () => {
    const result = contactFormSchema.safeParse({
      name: "テスト太郎",
      email: "test@example.com",
      company: "",
      message: "お問い合わせ内容をここに記入します。",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "test@example.com",
      message: "お問い合わせ内容をここに記入します。",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "テスト太郎",
      email: "not-an-email",
      message: "お問い合わせ内容をここに記入します。",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({
      name: "テスト太郎",
      email: "test@example.com",
      message: "短い",
    });
    expect(result.success).toBe(false);
  });
});
