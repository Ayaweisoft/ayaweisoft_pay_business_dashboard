import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Text / Number Input ──────────────────────────────────────────────────────

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
  suffix?: ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, prefix, suffix, className = "", ...props }, ref) => (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={prefix ? "input-prefix-wrap" : undefined} style={{ position: "relative" }}>
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          ref={ref}
          className={`input ${prefix ? "input--prefixed" : ""} ${error ? "input--error" : ""} ${className}`}
          style={error ? { borderColor: "var(--error-border)" } : undefined}
          {...props}
        />
        {suffix && (
          <span style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            color: "var(--foreground-muted)", pointerEvents: "none",
          }}>
            {suffix}
          </span>
        )}
      </div>
      {hint  && !error && <p className="field-hint">{hint}</p>}
      {error && (
        <p className="field-hint" style={{ color: "var(--error)" }}>{error}</p>
      )}
    </div>
  )
);
FormInput.displayName = "FormInput";


// ─── Select ───────────────────────────────────────────────────────────────────

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, options, placeholder, className = "", ...props }, ref) => (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <select
        ref={ref}
        className={`input ${error ? "input--error" : ""} ${className}`}
        style={{
          ...(error ? { borderColor: "var(--error-border)" } : {}),
          background: "var(--surface-container)",
          cursor: "pointer",
        }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint  && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-hint" style={{ color: "var(--error)" }}>{error}</p>}
    </div>
  )
);
FormSelect.displayName = "FormSelect";


// ─── Textarea ─────────────────────────────────────────────────────────────────

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, className = "", ...props }, ref) => (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <textarea
        ref={ref}
        className={`input ${error ? "input--error" : ""} ${className}`}
        style={{
          ...(error ? { borderColor: "var(--error-border)" } : {}),
          resize: "vertical",
          minHeight: 96,
          fontFamily: "var(--font-mono)",
          fontSize: "0.82rem",
        }}
        {...props}
      />
      {hint  && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-hint" style={{ color: "var(--error)" }}>{error}</p>}
    </div>
  )
);
FormTextarea.displayName = "FormTextarea";