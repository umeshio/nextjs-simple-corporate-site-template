import Image from 'next/image';
import ThreeObject from '@/app/_components/project/ThreeObject/paage';
// css
import styles from './page.module.css';
import title from '@/app/_styles/title.module.css';
import layout from '@/app/_styles/layout.module.css';

export default function Page() {
  return (
    <>
      <div className={layout.container}>
        <h2 className={title.sectionTitleEn}>Development</h2>
        <p className={title.sectionTitleJa}>研究開発</p>
        <p className={layout.text}>
          ダミーテキスト ダミーテキスト ダミーテキスト
          <br />
          ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
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

      <div className={layout.container}>
        <h2 className={title.sectionTitleEn}>Manufacturing</h2>
        <p className={title.sectionTitleJa}>製造・販売</p>
        <div className={styles.flexBox}>
          <Image className={styles.businessImg} src="/work.jpg" alt="" width={2400} height={1600} />
          <div className={styles.textBox}>
            <p>ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト</p>
            <p>
              ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
              ダミーテキスト ダミーテキスト
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
