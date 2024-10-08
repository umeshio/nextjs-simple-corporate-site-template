// formSchema.ts
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上で入力してください' })
    .max(10, { message: '10文字以下で入力してください' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  content: z.string().min(1, { message: 'お問い合わせ内容は入力必須です。' }),
});
