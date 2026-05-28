import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

vi.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: vi.fn(async () => "test-recaptcha-token"),
  }),
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/会社名/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メッセージ/)).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "送信" }));

    await waitFor(() => {
      expect(screen.getByText("名前を入力してください")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with form data and recaptcha token on valid submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => ({ success: true as const, message: "送信完了" }));

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/名前/), "テスト太郎");
    await user.type(screen.getByLabelText(/メールアドレス/), "test@example.com");
    await user.type(screen.getByLabelText(/メッセージ/), "テスト用のメッセージ本文です。");
    await user.click(screen.getByRole("button", { name: "送信" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          name: "テスト太郎",
          email: "test@example.com",
          company: "",
          message: "テスト用のメッセージ本文です。",
        },
        "test-recaptcha-token",
      );
    });
  });

  it("displays success message after successful submission", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => ({
      success: true as const,
      message: "送信ありがとうございます",
    }));

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/名前/), "テスト太郎");
    await user.type(screen.getByLabelText(/メールアドレス/), "test@example.com");
    await user.type(screen.getByLabelText(/メッセージ/), "テスト用のメッセージ本文です。");
    await user.click(screen.getByRole("button", { name: "送信" }));

    await waitFor(() => {
      expect(screen.getByText("送信ありがとうございます")).toBeInTheDocument();
    });
  });
});
