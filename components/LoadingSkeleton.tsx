export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded-md ${className}`} />
  );
}
