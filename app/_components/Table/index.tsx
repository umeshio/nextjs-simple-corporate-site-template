import React from 'react';
import styles from './page.module.css';

interface TableProps {
  items: { th: string; td: string }[];
}

const Table = ({ items }: TableProps) => {
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        {items.map((item, index) => (
          <tr key={index} className={styles.tr}>
            <th className={styles.th}>{item.th}</th>
            <td className="border-[1px] border-black py-3 px-5">{item.td}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
