import globalStyles from '@/app/page.module.css';
import pageStyles from './page.module.css';

export default function Page() {
  return (
    <section className={globalStyles.section}>
      <div className={pageStyles.container}>
        <p className={pageStyles.text}>
          ダミーテキスト ダミーテキスト ダミーテキスト
          <br />
          ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
        </p>
      </div>
    </section>
  );
}
