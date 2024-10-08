import { getNewsList } from '@/app/_features/news/libs/microcms';
import { NEWS_LIST_LIMIT } from '@/app/_features/news/libs/limit';
import Pagination from '@/app/_features/news/components/Pagination';
import ArticleList from '@/app/_features/news/components/NewsList';

type Props = {
  params: {
    current: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const current = parseInt(params.current as string, 10);
  const data = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} basePath="/news" />
    </>
  );
}
