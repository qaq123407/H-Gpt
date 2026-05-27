export type TableColumn<T> = {
  key: keyof T;
  title: string;
};

export type TableProps<T> = {
  columns: Array<TableColumn<T>>;
  data: T[];
};

export function Table<T extends Record<string, unknown>>({ columns, data }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={String(column.key)}>{String(row[column.key] ?? "")}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
