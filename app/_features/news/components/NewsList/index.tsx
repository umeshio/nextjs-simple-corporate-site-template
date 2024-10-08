import { Article } from '@/app/_features/news/libs/microcms';
import NewsListItem from '@/app/_features/news/components/NewsListItem';

type Props = {
  articles?: Article[];
};

export default function NewsList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul>
      {articles.map((article) => (
        <NewsListItem key={article.id} news={article} />
      ))}
    </ul>
  );
}
