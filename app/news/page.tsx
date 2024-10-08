import { getNewsList } from '@/app/_features/news/libs/microcms';
import { NEWS_LIST_LIMIT } from '@/app/_features/news/libs/limit';
import NewsList from '@/app/_features/news/components/NewsList';
import Pagination from '@/app/_features/news/components/Pagination';

export const revalidate = 60;

export default async function Page() {
  const data = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });
  return (
    <>
      <NewsList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath="/news" />
    </>
  );
}
