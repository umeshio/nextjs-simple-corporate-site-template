import Image from 'next/image';
import ThreeObject from '@/app/_components/ThreeObject/paage';
import styles from './page.module.css';
import PageStyles from '@/app/page.module.css';

export default function Page() {
  return (
    <>
      <section className={PageStyles.section}>
        <div className={PageStyles.container}>
          <h2 className={PageStyles.sectionTitleEn}>Development</h2>
          <p className={PageStyles.sectionTitleJa}>研究開発</p>
          <p className={PageStyles.text}>
            ダミーテキスト ダミーテキスト ダミーテキスト
            <br />
            ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
            ダミーテキスト
          </p>
          <div className={styles.imageBox}>
            <Image
              className={styles.businessImg}
              src="/img-business.png"
              alt=""
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </section>
      <section className={PageStyles.section}>
        <div className={PageStyles.container}>
          <h2 className={PageStyles.sectionTitleEn}>Manufacturing</h2>
          <p className={PageStyles.sectionTitleJa}>製造・販売</p>
          <p className={PageStyles.text}>
            ダミーテキスト ダミーテキスト ダミーテキスト
            <br />
            ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
            ダミーテキスト
          </p>
          <div className={styles.flexBox}>
            <Image
              className={styles.businessImg}
              src="/work.jpg"
              alt=""
              width={2400}
              height={1600}
            />
            <div className={styles.textBox}>
              <p>ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト</p>
              <p>
                ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
                ダミーテキスト ダミーテキスト
              </p>
              <p>ダミーテキスト ダミーテキスト ダミーテキスト </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
