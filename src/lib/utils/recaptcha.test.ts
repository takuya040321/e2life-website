import { afterEach, describe, expect, it, vi } from "vitest";

import { verifyRecaptcha } from "./recaptcha";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("verifyRecaptcha", () => {
  it("returns no-secret when secret key is missing", async () => {
    const result = await verifyRecaptcha("token", undefined, 0.5);
    expect(result).toEqual({ ok: false, reason: "no-secret" });
  });

  it("returns ok with score on successful verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: true, score: 0.9 }),
      })),
    );

    const result = await verifyRecaptcha("token", "secret", 0.5);
    expect(result).toEqual({ ok: true, score: 0.9 });
  });

  it("returns low-score when score is below threshold", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: true, score: 0.3 }),
      })),
    );

    const result = await verifyRecaptcha("token", "secret", 0.5);
    expect(result).toEqual({ ok: false, reason: "low-score" });
  });

  it("returns verify-failed when API returns failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: false, "error-codes": ["invalid-input-response"] }),
      })),
    );

    const result = await verifyRecaptcha("token", "secret", 0.5);
    expect(result).toEqual({ ok: false, reason: "verify-failed" });
  });

  it("returns verify-failed when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, json: async () => ({}) })),
    );

    const result = await verifyRecaptcha("token", "secret", 0.5);
    expect(result).toEqual({ ok: false, reason: "verify-failed" });
  });
});
