import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(100, "100 文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  company: z.string().max(200, "200 文字以内で入力してください").optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "10 文字以上で入力してください")
    .max(5000, "5000 文字以内で入力してください"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
