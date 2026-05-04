import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, isLoading, emptyMessage }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <LoadingSkeleton className="h-12 w-full mb-2" />
        <LoadingSkeleton className="h-12 w-full mb-2" />
        <LoadingSkeleton className="h-12 w-full mb-2" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-white/60 py-8">{emptyMessage || "No data found."}</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-bg-card">
      <table className="min-w-full text-sm">
        <thead className="bg-bg-dark/80">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-3 text-left font-semibold text-white/80">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-t border-border hover:bg-bg-dark/40 transition">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-white/90">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
