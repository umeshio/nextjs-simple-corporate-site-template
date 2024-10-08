// emailService.ts
import emailjs from '@emailjs/browser';
import { formType } from '../types/formTypes';

export const sendContactEmail = async (data: formType) => {
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const templateId02 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE02_ID;

  if (!userId || !serviceId || !templateId || !templateId02) {
    throw new Error('環境変数が不足しています。');
  }

  emailjs.init(userId);
  const params = { name: data.name, email: data.email, content: data.content };

  // メール送信リクエスト
  await emailjs.send(serviceId, templateId, params);
  await emailjs.send(serviceId, templateId02, params);
};
