import Hero from '@/app/_components/elements/Hero';
import Sheet from '@/app/_components/elements/Sheet';

export const metadata = {
  title: 'サービス内容｜株式会社ABC',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Service" sub="サービス内容" />
      <Sheet>{children}</Sheet>
    </>
  );
}
