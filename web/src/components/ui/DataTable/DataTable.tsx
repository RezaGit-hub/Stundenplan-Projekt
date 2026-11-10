import type { ReactNode } from "react";
import styles from './DataTable.module.css';

export interface Column<T>{   /*T ist der typ eine Zeile*/
  key: string;
  header: string;
  render: (row: T) => ReactNode;        /*render bekommt eine Zeile und liefert was in der Zeile stehen soll*/
}

interface DataTableProps<T>{
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row:T) => string; /*es braucht pro ZEile einen eindutigen Key. */
  emptyMessage?: string;
}

/*hier wird T deklariert und gleich in Props verwendet*/
export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'keine Einträge vorhanden.',
}: DataTableProps<T>){
  return(
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={styles.th}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ): (
            rows.map((row) => (
              <tr key={getRowKey(row)} className={styles.tr}>
                {columns.map((column) => (
                  <td key={column.key} className={styles.td}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
