"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ContactFormData } from "@/lib/validations/contact";
import { contactFormSchema } from "@/lib/validations/contact";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type ContactFormProps = {
  onSubmit: (
    data: ContactFormData,
    recaptchaToken: string,
  ) => Promise<{ success: true; message: string } | { success: false; error: string }>;
};

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const fieldClassName =
    "border-border bg-background/60 rounded-sm focus-visible:border-accent focus-visible:ring-accent/40";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setSubmitState({ status: "submitting" });

    if (!executeRecaptcha) {
      setSubmitState({
        status: "error",
        message: "reCAPTCHA の準備ができていません。ページを再読み込みしてください。",
      });
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact_form");
      const result = await onSubmit(data, recaptchaToken);

      if (result.success) {
        setSubmitState({ status: "success", message: result.message });
        reset();
      } else {
        setSubmitState({ status: "error", message: result.error });
      }
    } catch {
      setSubmitState({
        status: "error",
        message: "送信に失敗しました。時間を置いてお試しください。",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="border-border bg-card/70 space-y-6 rounded-lg border p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name">
          名前 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          className={fieldClassName}
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-destructive text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          メールアドレス <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          className={fieldClassName}
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-destructive text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">会社名（任意）</Label>
        <Input
          id="company"
          className={fieldClassName}
          {...register("company")}
          aria-invalid={errors.company ? "true" : "false"}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
        {errors.company && (
          <p id="company-error" className="text-destructive text-sm">
            {errors.company.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          メッセージ <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={6}
          className={fieldClassName}
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-destructive text-sm">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || submitState.status === "submitting"}
        className="bg-accent text-accent-foreground hover:bg-accent/90 border-accent rounded-sm px-5"
      >
        {submitState.status === "submitting" ? "送信中..." : "送信"}
      </Button>

      {submitState.status === "success" && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          {submitState.message}
        </p>
      )}
      {submitState.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {submitState.message}
        </p>
      )}

      <p className="text-muted-foreground text-xs">
        このフォームは reCAPTCHA で保護されており、Google の
        <a
          href="https://policies.google.com/privacy"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          プライバシーポリシー
        </a>
        と
        <a
          href="https://policies.google.com/terms"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          利用規約
        </a>
        が適用されます。
      </p>
    </form>
  );
}
