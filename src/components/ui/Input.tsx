import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label:      string;
  error?:     string;
  required?:  boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label:     string;
  error?:    string;
  required?: boolean;
}

export function Input({ label, error, required, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </label>
      <input
        className={`
          w-full bg-surface border rounded-lg px-4 py-2.5 text-sm text-slate-100
          placeholder:text-slate-600 transition-all duration-200
          ${error
            ? 'border-red-500 focus:ring-red-500/40'
            : 'border-border focus:ring-brand-500/40'
          }
          focus:outline-none focus:ring-2 focus:border-transparent
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export function Textarea({ label, error, required, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </label>
      <textarea
        rows={3}
        className={`
          w-full bg-surface border rounded-lg px-4 py-2.5 text-sm text-slate-100
          placeholder:text-slate-600 transition-all duration-200 resize-none
          ${error
            ? 'border-red-500 focus:ring-red-500/40'
            : 'border-border focus:ring-brand-500/40'
          }
          focus:outline-none focus:ring-2 focus:border-transparent
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}