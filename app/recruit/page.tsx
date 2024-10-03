import styles from '@/app/page.module.css';

export default function Page() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.text}>
          ダミーテキスト ダミーテキスト ダミーテキスト
          <br />
          ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
        </p>
      </div>
    </section>
  );
}
