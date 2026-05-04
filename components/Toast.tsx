import { ReactNode } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  action?: ReactNode;
}

export function Toast({ message, type = "info", action }: ToastProps) {
  const colorMap = {
    success: "bg-success text-white",
    error: "bg-error text-white",
    info: "bg-primary text-white",
  };
  return (
    <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50 ${colorMap[type]} flex items-center gap-3`}>
      <span>{message}</span>
      {action}
    </div>
  );
}
