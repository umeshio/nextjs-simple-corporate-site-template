import { Metadata } from 'next';
import Script from 'next/script';
import Footer from '@/app/_components/project/Footer';
import Header from '@/app/_components/project/Header';
import './globals.css';
import styles from './layout.module.css';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
    title: '株式会社ABC',
    description: 'テクノロジーで世界を良くする',
    openGraph: {
      title: '株式会社ABC',
      description: 'テクノロジーで世界を良くする',
      images: '',
    },
    alternates: {
      canonical: '',
    },
  };
}

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <Script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src={`//js.hs-scripts.com/${process.env.HUBSPOT_PORTAL_ID}.js`}
      ></Script>
      <body className={styles.body}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
