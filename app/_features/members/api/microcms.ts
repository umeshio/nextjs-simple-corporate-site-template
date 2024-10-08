import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries, MicroCMSImage } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// メンバーの型定義
export type Member = {
  name: string;
  position: string;
  profile: string;
  image?: MicroCMSImage;
};

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// メンバー一覧を取得
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Member>({
      endpoint: 'members',
      queries,
    })
    .catch(notFound);
  return listData;
};
