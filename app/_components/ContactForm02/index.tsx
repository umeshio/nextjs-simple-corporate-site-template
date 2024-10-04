'use client';

// https://zenn.dev/y_ta/books/16910da8a3748e/viewer/d3f8be

import React from 'react';
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
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

const formShema = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上で入力してください' })
    .max(10, { message: '10文字以下で入力してください' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  content: z.string().min(1, { message: 'お問い合わせ内容は入力必須です。' }),
});

type formType = z.infer<typeof formShema>;

const Contact = () => {
  const form = useForm<formType>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  });

  // @ts-ignore
  const onSubmit: SubmitHandler<formType> = async (data: formType) => {
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateId02 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE02_ID;

    const { name, email, content } = data;

    if (userId && serviceId && templateId && templateId02) {
      //emailjsを初期化する
      emailjs.init(userId);

      //送信するデータを定義する
      const params = {
        name: name,
        email: email,
        content: content,
      };

      //送信する
      await emailjs.send(serviceId, templateId, params);
      await emailjs.send(serviceId, templateId02, params);
      form.reset();
    }
  };

  return (
    <div className="container h-screen flex items-center">
      <div className="lg:w-[60%] w-full mx-auto">
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
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>送信</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
