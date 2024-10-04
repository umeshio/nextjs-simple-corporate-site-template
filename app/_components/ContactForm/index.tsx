'use client';

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
  const [isSubmitted, setIsSubmitted] = useState(false); // 送信完了状態を管理
  const [isConfirming, setIsConfirming] = useState(false); // 確認画面状態を管理
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<formType> = async (data: formType) => {
    setIsLoading(true);
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
      setIsSubmitted(true); // 送信完了状態に設定
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 確認画面表示関数
  const handleConfirm = () => {
    setIsConfirming(true);
  };

  // 確認画面から戻る関数
  const handleBack = () => {
    setIsConfirming(false);
  };

  return (
    <div className="container h-screen flex items-center">
      <div className="lg:w-[60%] w-full mx-auto">
        {!isSubmitted ? (
          <>
            <h2 className="text-[40px] font-bold mb-[30px]">
              {isConfirming ? '入力内容確認' : 'お問い合わせ'}
            </h2>
            <Form {...form}>
              {/* 入力画面 */}
              {!isConfirming ? (
                <form className="space-y-8" onSubmit={form.handleSubmit(handleConfirm)}>
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
                  <Button type="submit">確認</Button> {/* 確認ボタン */}
                </form>
              ) : (
                /* 確認画面 */
                <div>
                  <div className="mb-4">
                    <p>
                      <strong>名前:</strong> {form.getValues('name')}
                    </p>
                    <p>
                      <strong>メールアドレス:</strong> {form.getValues('email')}
                    </p>
                    <p>
                      <strong>お問い合わせ内容:</strong> {form.getValues('content')}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button onClick={handleBack}>戻る</Button> {/* 戻るボタン */}
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                      {isLoading ? '送信中...' : '送信'} {/* 送信ボタン */}
                    </Button>
                  </div>
                </div>
              )}
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
