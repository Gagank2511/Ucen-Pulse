/**
 * Footer Component
 * Application footer with information and keyboard shortcuts
 */

import React from "react";

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors" role="contentinfo">
      <p className="text-center">
        Client-side demo • Accessible & responsive • Data saved locally in your browser
      </p>
      <p className="mt-2 text-xs text-center">
        <span className="font-medium">Keyboard shortcuts:</span> Tab to navigate, Enter to submit forms, Space to toggle buttons
      </p>
    </footer>
  );
}

