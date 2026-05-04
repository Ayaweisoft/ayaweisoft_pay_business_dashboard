import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export function ChartCard({ title, children, action }: ChartCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/70 font-medium">{title}</span>
        {action}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
