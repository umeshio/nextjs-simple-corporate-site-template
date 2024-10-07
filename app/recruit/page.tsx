import globalStyles from '@/app/page.module.css';
import styles from './page.module.css';
import Card from '../_components/Card';
import Table from '../_components/Table';

export default function Page() {
  return (
    <>
      <section className={globalStyles.section}>
        <h2 className={styles.title}>採用フロー</h2>
        <div className={styles.flowList}>
          <Card>
            <>
              <div className={styles.cardTitle}>1. 書類選考</div>
              <p className="mt-2">
                ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
              </p>
            </>
          </Card>
          <Card>
            <>
              <div className={styles.cardTitle}>2. 筆記試験</div>
              <p className="mt-2">
                ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
              </p>
            </>
          </Card>
          <Card>
            <>
              <div className={styles.cardTitle}>3. 面接</div>
              <p className="mt-2">
                ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト ダミーテキスト
              </p>
            </>
          </Card>
        </div>
      </section>
      <section className={globalStyles.section}>
        <h2 className={styles.title}>募集要項</h2>
        <Table
          items={[
            { th: '勤務地', td: '東京都渋谷区1' },
            { th: '雇用形態', td: '正社員' },
            { th: '業務内容', td: '製品の企画・販売' },
            { th: '基本給', td: '20万〜' },
            { th: '賞与', td: '年2回' },
          ]}
        ></Table>
      </section>
    </>
  );
}
