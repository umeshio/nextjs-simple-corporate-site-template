// ContactForm.tsx
'use client';

import React, { useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../schemas/formSchema'; // バリデーションをインポート
import { sendContactEmail } from '../../api/emailService'; // API呼び出し関数をインポート
import { formType } from '../../types/formTypes'; // 型定義をインポート
import Thanks from '../Thanks';

const ContactForm = () => {
  // フォーム画面の状態管理
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', content: '' },
  });

  const onSubmit: SubmitHandler<formType> = async (data: formType) => {
    setIsLoading(true);
    try {
      await sendContactEmail(data); // API呼び出し関数を使用
      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      setIsError(true);
      setErrorMessage('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  // JSX部分も基本的にそのまま使用
  return (
    <div className="container flex items-center">
      <div className="lg:w-[60%] w-full mx-auto">
        {isError ? (
          <div className="text-center">
            <h2 className="text-lg font-bold mb-[30px] text-red-600">エラーが発生しました</h2>
            <p className="text-red-600 mb-4">{errorMessage}</p>
            <Button onClick={() => setIsError(false)}>戻る</Button>{' '}
            {/* エラー状態を解除してフォームに戻る */}
          </div>
        ) : !isSubmitted ? (
          <>
            <h2 className="text-[40px] font-bold mb-[30px]">
              {isConfirming ? '入力内容確認' : 'お問い合わせ'}
            </h2>
            <Form {...form}>
              {!isConfirming ? (
                <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(() => setIsConfirming(true))}
                >
                  {/* 名前、メールアドレス、お問い合わせ内容のフォーム */}
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
                  <Button type="submit">確認</Button>
                </form>
              ) : (
                <div>
                  {/* 確認画面 */}
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
                  <div className="flex gap-x-4 items-center">
                    <Button onClick={() => setIsConfirming(false)}>戻る</Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                      {isLoading ? '送信中...' : '送信'}
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </>
        ) : (
          <Thanks></Thanks>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
