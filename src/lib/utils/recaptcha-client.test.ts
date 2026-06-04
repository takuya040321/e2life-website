import { afterEach, describe, expect, it, vi } from "vitest";

type RecaptchaTestWindow = Window & {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
};

type ExecuteLazyRecaptcha = typeof import("./recaptcha-client").executeLazyRecaptcha;

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v3";
const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

async function importExecuteLazyRecaptcha(): Promise<ExecuteLazyRecaptcha> {
  vi.resetModules();
  const { executeLazyRecaptcha } = await import("./recaptcha-client");

  return executeLazyRecaptcha;
}

function getRecaptchaWindow() {
  return window as RecaptchaTestWindow;
}

function createGrecaptchaMock() {
  return {
    ready: vi.fn((callback: () => void) => {
      callback();
    }),
    execute: vi.fn(async () => "recaptcha-token"),
  };
}

function getRecaptchaScript() {
  const script = document.getElementById(RECAPTCHA_SCRIPT_ID);

  if (!(script instanceof HTMLScriptElement)) {
    throw new Error("Expected reCAPTCHA script to exist.");
  }

  return script;
}

describe("executeLazyRecaptcha", () => {
  afterEach(() => {
    delete getRecaptchaWindow().grecaptcha;
    document.getElementById(RECAPTCHA_SCRIPT_ID)?.remove();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("executes reCAPTCHA v3 with the provided action when grecaptcha is already loaded", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const grecaptcha = createGrecaptchaMock();
    getRecaptchaWindow().grecaptcha = grecaptcha;

    await expect(executeLazyRecaptcha("contact_form")).resolves.toBe("recaptcha-token");
    expect(grecaptcha.execute).toHaveBeenCalledWith(expect.any(String), {
      action: "contact_form",
    });
  });

  it("dynamically inserts the reCAPTCHA script with the expected attributes", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const createElement = vi.spyOn(document, "createElement");
    const promise = executeLazyRecaptcha("contact_form");
    const script = getRecaptchaScript();
    const grecaptcha = createGrecaptchaMock();

    expect(createElement).toHaveBeenCalledWith("script");
    expect(script.id).toBe(RECAPTCHA_SCRIPT_ID);
    expect(script.src).toBe(`https://www.google.com/recaptcha/api.js?render=${TEST_SITE_KEY}`);
    expect(script.async).toBe(true);
    expect(script.defer).toBe(true);

    getRecaptchaWindow().grecaptcha = grecaptcha;
    script.dispatchEvent(new Event("load"));

    await expect(promise).resolves.toBe("recaptcha-token");
  });

  it("reuses an existing reCAPTCHA script instead of inserting another one", async () => {
    const existingScript = document.createElement("script");
    existingScript.id = RECAPTCHA_SCRIPT_ID;
    document.head.appendChild(existingScript);

    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const createElement = vi.spyOn(document, "createElement");
    const promise = executeLazyRecaptcha("contact_form");
    const grecaptcha = createGrecaptchaMock();

    expect(createElement).not.toHaveBeenCalledWith("script");
    expect(document.querySelectorAll(`#${RECAPTCHA_SCRIPT_ID}`)).toHaveLength(1);

    getRecaptchaWindow().grecaptcha = grecaptcha;
    existingScript.dispatchEvent(new Event("load"));

    await expect(promise).resolves.toBe("recaptcha-token");
  });

  it("caches the in-flight reCAPTCHA load promise across concurrent executions", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const createElement = vi.spyOn(document, "createElement");
    const firstPromise = executeLazyRecaptcha("contact_form");
    const secondPromise = executeLazyRecaptcha("contact_form_retry");
    const script = getRecaptchaScript();
    const grecaptcha = createGrecaptchaMock();

    expect(createElement).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll(`#${RECAPTCHA_SCRIPT_ID}`)).toHaveLength(1);

    getRecaptchaWindow().grecaptcha = grecaptcha;
    script.dispatchEvent(new Event("load"));

    await expect(firstPromise).resolves.toBe("recaptcha-token");
    await expect(secondPromise).resolves.toBe("recaptcha-token");
    expect(grecaptcha.execute).toHaveBeenCalledTimes(2);
  });

  it("waits for grecaptcha.ready after the script load event", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const promise = executeLazyRecaptcha("contact_form");
    const script = getRecaptchaScript();
    const grecaptcha = createGrecaptchaMock();

    getRecaptchaWindow().grecaptcha = grecaptcha;
    script.dispatchEvent(new Event("load"));

    await expect(promise).resolves.toBe("recaptcha-token");
    expect(grecaptcha.ready).toHaveBeenCalledTimes(1);
  });

  it("rejects when the reCAPTCHA script fails to load", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const promise = executeLazyRecaptcha("contact_form");
    const script = getRecaptchaScript();

    script.dispatchEvent(new Event("error"));

    await expect(promise).rejects.toThrow("Failed to load reCAPTCHA script.");
  });

  it("rejects when the script loads without defining grecaptcha", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const promise = executeLazyRecaptcha("contact_form");
    const script = getRecaptchaScript();

    script.dispatchEvent(new Event("load"));

    await expect(promise).rejects.toThrow("reCAPTCHA script loaded without grecaptcha.");
  });

  it("can insert a new script after a failed load clears the cached promise", async () => {
    const executeLazyRecaptcha = await importExecuteLazyRecaptcha();
    const createElement = vi.spyOn(document, "createElement");
    const failedPromise = executeLazyRecaptcha("contact_form");
    const failedScript = getRecaptchaScript();

    failedScript.dispatchEvent(new Event("error"));

    await expect(failedPromise).rejects.toThrow("Failed to load reCAPTCHA script.");

    failedScript.remove();

    const retryPromise = executeLazyRecaptcha("contact_form_retry");
    const retryScript = getRecaptchaScript();
    const grecaptcha = createGrecaptchaMock();

    expect(createElement).toHaveBeenCalledTimes(2);

    getRecaptchaWindow().grecaptcha = grecaptcha;
    retryScript.dispatchEvent(new Event("load"));

    await expect(retryPromise).resolves.toBe("recaptcha-token");
  });
});
