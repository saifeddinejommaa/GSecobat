import { useState } from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
};

export default function DataTable<T>({ data, columns, onRowClick }: Props<T>) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const start = (page - 1) * pageSize;
  const paginatedData = data.slice(start, start + pageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="glass-card">
      <table className="modern-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} onClick={() => onRowClick?.(item)}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(item)
                    : (item[col.key] as any)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}