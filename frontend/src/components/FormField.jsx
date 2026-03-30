/**
 * FormField Component
 * Reusable form field wrapper with label and error display
 */

import React from "react";

export default function FormField({ 
  id, 
  label, 
  error, 
  children, 
  required = false 
}) {
  return (
    <section>
      <label htmlFor={id} className="block">
        <span className="text-sm font-medium dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {children}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

