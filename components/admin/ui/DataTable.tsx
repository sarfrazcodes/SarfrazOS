import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({ data, columns, searchPlaceholder = "Search...", onRowClick }: DataTableProps<T>) {
  // Simplistic implementation for now, will expand with real pagination
  return (
    <div className="bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-brand-blue focus:bg-white dark:focus:bg-black rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-white outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 font-bold tracking-wider">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-zinc-500">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-zinc-900 dark:text-zinc-300">
                      {col.cell ? col.cell(row) : (row as any)[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Mock) */}
      <div className="p-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-sm text-zinc-500">
        <div>Showing 1 to {data.length} of {data.length} entries</div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"><ChevronLeft size={16} /></button>
          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"><ChevronRight size={16} /></button>
        </div>
      </div>

    </div>
  );
}
