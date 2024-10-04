import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

export const metadata = {
  title: 'コンタクト｜シンプルなコーポレートサイト',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Contact EmailJs" sub="EmailJsお問い合わせ" />
      <Sheet>{children}</Sheet>
    </>
  );
}
