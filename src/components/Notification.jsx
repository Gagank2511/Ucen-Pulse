/**
 * Notification Component
 * Displays success/error messages that auto-dismiss after 3 seconds
 */

import { useEffect } from "react";

export default function Notification({ message, type, onClose }) {
  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <aside
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}
      role="alert"
      aria-live="polite"
    >
      <p className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 font-bold"
          aria-label="Close notification"
        >
          ×
        </button>
      </p>
    </aside>
  );
}

