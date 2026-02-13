import React from 'react';
import { BiSearch } from 'react-icons/bi';

/**
 * Reusable TextField component
 * Props:
 * - label: string (optional)
 * - name: string (optional)
 * - value: string
 * - onChange: fn
 * - placeholder: string
 * - type: string (default 'text')
 * - error: string (optional) - will show an error message
 * - disabled: boolean
 * - startIcon / endIcon: React node to render inside the input
 * - className: additional classes for container
 */
export default function TextField({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  error,
  disabled = false,
  startIcon,
  endIcon,
  className = '',
  ...rest
}) {
  return (
    <div className={`flex bg-white flex-col ${className}`}>
      {label && (
        <label className={`text-xs font-medium mb-1 ${disabled ? 'text-gray-400' : 'text-gray-700'} dark:${disabled ? 'text-gray-600' : 'text-gray-200'}`} htmlFor={name}>
          {label}
        </label>
      )}

      <div
        className={`relative rounded-md border px-2 py-1.5 flex items-center gap-2 transition-colors duration-150 ${
          error
            ? 'border-red-500'
            : 'border-gray-300 dark:border-gray-700'
        } bg-app`}
      >
        {startIcon ? (
          <div className="text-gray-500shrink-0">{startIcon}</div>
        ) : null}

        <input
          id={name}
          name={name}
        //   value={value}
        //   onChange={onChange}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          className={`w-full bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed`}
          {...rest}
        />

        {endIcon ? (
          <div className="text-gray-500 dark:text-gray-300 shrink-0">{endIcon}</div>
        ) : null}
      </div>

      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}
