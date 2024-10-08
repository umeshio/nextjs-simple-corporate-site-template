import Hero from '@/app/_components/elements/Hero';
import Sheet from '@/app/_components/elements/Sheet';

export const metadata = {
  title: 'メンバー｜シンプルなコーポレートサイト',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Members" sub="メンバー" />
      <Sheet>{children}</Sheet>
    </>
  );
}
