import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs text-white/70 font-medium mb-1">{label}</label>}
      <input
        ref={ref}
        className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition"
        {...props}
      />
      {error && <span className="text-xs text-error mt-1">{error}</span>}
    </div>
  )
);
FormInput.displayName = "FormInput";
