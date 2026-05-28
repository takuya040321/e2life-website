"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import type { ReactNode } from "react";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

type ReCaptchaProviderProps = {
  children: ReactNode;
};

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const siteKey = process.env["NEXT_PUBLIC_RECAPTCHA_SITE_KEY"] ?? TEST_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true, defer: true }}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
