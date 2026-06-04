import { afterEach, describe, expect, it, vi } from "vitest";

import { executeLazyRecaptcha } from "./recaptcha-client";

type RecaptchaTestWindow = Window & {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
};

describe("executeLazyRecaptcha", () => {
  afterEach(() => {
    delete (window as RecaptchaTestWindow).grecaptcha;
    document.getElementById("google-recaptcha-v3")?.remove();
    vi.restoreAllMocks();
  });

  it("executes reCAPTCHA v3 with the provided action when grecaptcha is already loaded", async () => {
    const execute = vi.fn(async () => "recaptcha-token");
    (window as RecaptchaTestWindow).grecaptcha = {
      ready: (callback) => {
        callback();
      },
      execute,
    };

    await expect(executeLazyRecaptcha("contact_form")).resolves.toBe("recaptcha-token");
    expect(execute).toHaveBeenCalledWith(expect.any(String), { action: "contact_form" });
  });
});
