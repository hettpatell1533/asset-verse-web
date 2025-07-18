import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <table className="w-full table-auto">
        <thead className="bg-[#f9fafb] text-left text-sm font-semibold text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-6 py-3 border-b">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-3 border-b">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-[#f3f4f6] transition-colors border-b text-sm text-gray-800"
            >
              {columns.map((col) => (
                <td key={col.header} className="px-6 py-4 whitespace-nowrap">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t bg-white text-sm">
        <div className="text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
