import Hero from '@/app/_components/elements/Hero';
import Sheet from '@/app/_components/elements/Sheet';

export const metadata = {
  title: '採用情報｜株式会社ABC',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Recruit" sub="採用情報" />
      <Sheet>{children}</Sheet>
    </>
  );
}
