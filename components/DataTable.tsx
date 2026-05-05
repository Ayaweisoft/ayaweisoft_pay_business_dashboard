import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, SortingState } from "@tanstack/react-table";
import { LucideChevronUp, LucideChevronDown, LucideChevronsUpDown, LucideAlertCircle } from "lucide-react";
import { TableSkeleton } from "./LoadingSkeleton";
import { useState } from "react";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  sortable?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data found.",
  emptyIcon,
  sortable = false,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable ? { getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting, state: { sorting } } : {}),
  });

  if (isLoading) return <TableSkeleton rows={4} />;

  if (!data.length) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">
          {emptyIcon ?? <LucideAlertCircle size={20} strokeWidth={1.5} color="var(--foreground-subtle)" />}
        </span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => {
                const canSort = sortable && header.column.getCanSort();
                return (
                  <th
                    key={header.id}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    style={{
                      cursor: canSort ? "pointer" : "default",
                      userSelect: canSort ? "none" : "auto",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        <span style={{ color: "var(--foreground-faint)" }}>
                          {header.column.getIsSorted() === "asc"  && <LucideChevronUp   size={11} />}
                          {header.column.getIsSorted() === "desc" && <LucideChevronDown  size={11} />}
                          {!header.column.getIsSorted()           && <LucideChevronsUpDown size={11} />}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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