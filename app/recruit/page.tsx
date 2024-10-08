import Card from '../_components/elements/Card';
import Table from '../_components/elements/Table';
// css
import title from '@/app/_styles/title.module.css';
import styles from './page.module.css';

export default function Page() {
  return (
    <>
      <h2 className={title.sectionTitleEn}>flow</h2>
      <p className={title.sectionTitleJa}>選考フロー</p>
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

      <h2 className={title.sectionTitleEn}>requirements</h2>
      <p className={title.sectionTitleJa}>募集要項</p>
      <Table
        items={[
          { th: '勤務地', td: '東京都渋谷区1' },
          { th: '雇用形態', td: '正社員' },
          { th: '業務内容', td: '製品の企画・販売' },
          { th: '基本給', td: '20万〜' },
          { th: '賞与', td: '年2回' },
        ]}
      ></Table>
    </>
  );
}
