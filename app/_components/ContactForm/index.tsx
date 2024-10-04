'use client';

// https://zenn.dev/y_ta/books/16910da8a3748e/viewer/d3f8be

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上で入力してください' })
    .max(10, { message: '10文字以下で入力してください' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  content: z.string().min(1, { message: 'お問い合わせ内容は入力必須です。' }),
});

type formType = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ローディング中を管理
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<formType> = async (data: formType) => {
    setIsLoading(true); // 送信中にローディング状態にする
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateId02 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE02_ID;

    const { name, email, content } = data;

    if (!userId || !serviceId || !templateId || !templateId02) {
      console.error('環境変数が不足しています。');
      setIsLoading(false);
      return;
    }

    emailjs.init(userId);

    const params = {
      name,
      email,
      content,
    };

    try {
      await emailjs.send(serviceId, templateId, params);
      await emailjs.send(serviceId, templateId02, params);
      form.reset();
      setIsSubmitted(true); // 送信完了時に状態を更新
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsLoading(false); // 送信後にローディング状態を解除
    }
  };

  return (
    <div className="container h-screen flex items-center">
      <div className="lg:w-[60%] w-full mx-auto">
        {!isSubmitted ? ( // フォームを送信後、メッセージに切り替える
          <>
            <h2 className="text-[40px] font-bold mb-[30px]">お問い合わせ</h2>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input placeholder="y_ta" {...field} />
                      </FormControl>
                      <FormDescription>お名前をお書きください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription>メールアドレスをお書きください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>お問い合わせ内容</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Next.jsの使い方を教えてください"
                          {...field}
                          className="resize-none h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '送信中...' : '送信'}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <h2 className="text-[40px] font-bold mb-[30px] text-center">
            送信ありがとうございます！
          </h2>
        )}
      </div>
    </div>
  );
};

export default Contact;
