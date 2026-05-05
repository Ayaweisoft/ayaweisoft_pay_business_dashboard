interface LoadingSkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  count?: number;
  gap?: number;
}

const radiiMap = {
  sm:   "var(--radius-sm)",
  md:   "var(--radius-md)",
  lg:   "var(--radius-lg)",
  xl:   "var(--radius-xl)",
  full: "9999px",
};

export function LoadingSkeleton({
  className = "",
  height,
  width,
  rounded = "md",
  count = 1,
  gap = 8,
}: LoadingSkeletonProps) {
  const style: React.CSSProperties = {
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    width:  width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
    borderRadius: radiiMap[rounded],
  };

  const items = Array.from({ length: count });

  if (count === 1) {
    return <div className={`skeleton ${className}`} style={style} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {items.map((_, i) => (
        <div key={i} className={`skeleton ${className}`} style={style} />
      ))}
    </div>
  );
}

/** Full panel skeleton — mimics a card with header + rows */
export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header row */}
      <div style={{
        padding: "12px 20px",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", gap: 12,
      }}>
        <LoadingSkeleton height={14} width={100} />
        <LoadingSkeleton height={14} width={60}  />
        <LoadingSkeleton height={14} width={80}  />
      </div>
      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <LoadingSkeleton height={32} width={32} rounded="lg" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <LoadingSkeleton height={13} width="55%" />
            <LoadingSkeleton height={11} width="35%" />
          </div>
          <LoadingSkeleton height={13} width={80} />
          <LoadingSkeleton height={22} width={70} rounded="full" />
        </div>
      ))}
    </div>
  );
}