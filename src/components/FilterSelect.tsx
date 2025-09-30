'use client';

import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-300 tracking-wide">
        {label} {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600
          rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 
          focus:border-blue-400 transition-all duration-300 hover:border-gray-500
          text-gray-200 font-medium
          ${
            disabled
              ? 'bg-gray-900/80 cursor-not-allowed opacity-60 border-gray-700'
              : 'hover:shadow-xl'
          }
        `}
        required={required}
        disabled={disabled}
      >
        <option value="" className="text-gray-400 bg-gray-800">
          Choose {label.toLowerCase()}...
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="text-gray-200 bg-gray-800"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
