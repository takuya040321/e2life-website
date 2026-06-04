const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v3";

type GoogleRecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

type RecaptchaWindow = Window & {
  grecaptcha?: GoogleRecaptcha;
};

let recaptchaLoadPromise: Promise<GoogleRecaptcha> | null = null;

function getSiteKey() {
  return process.env["NEXT_PUBLIC_RECAPTCHA_SITE_KEY"] ?? TEST_SITE_KEY;
}

function getRecaptchaWindow() {
  return window as RecaptchaWindow;
}

function waitForReady(grecaptcha: GoogleRecaptcha) {
  return new Promise<GoogleRecaptcha>((resolve) => {
    grecaptcha.ready(() => {
      resolve(grecaptcha);
    });
  });
}

function loadGoogleRecaptcha(siteKey: string) {
  const recaptchaWindow = getRecaptchaWindow();

  if (recaptchaWindow.grecaptcha) {
    return waitForReady(recaptchaWindow.grecaptcha);
  }

  if (recaptchaLoadPromise) {
    return recaptchaLoadPromise;
  }

  recaptchaLoadPromise = new Promise<GoogleRecaptcha>((resolve, reject) => {
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (recaptchaWindow.grecaptcha) {
          waitForReady(recaptchaWindow.grecaptcha).then(resolve, reject);
        } else {
          reject(new Error("reCAPTCHA script loaded without grecaptcha."));
        }
      });
      existingScript.addEventListener("error", () => {
        reject(new Error("Failed to load reCAPTCHA script."));
      });
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (recaptchaWindow.grecaptcha) {
        waitForReady(recaptchaWindow.grecaptcha).then(resolve, reject);
      } else {
        reject(new Error("reCAPTCHA script loaded without grecaptcha."));
      }
    };
    script.onerror = () => {
      recaptchaLoadPromise = null;
      reject(new Error("Failed to load reCAPTCHA script."));
    };

    document.head.appendChild(script);
  });

  return recaptchaLoadPromise;
}

export async function executeLazyRecaptcha(action: string) {
  const siteKey = getSiteKey();
  const grecaptcha = await loadGoogleRecaptcha(siteKey);

  return grecaptcha.execute(siteKey, { action });
}
