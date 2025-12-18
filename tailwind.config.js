// Tailwind CSS configuration file
export default {
  // Files to scan for Tailwind classes
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // All JS/JSX/TS/TSX files in src folder
  ],

  // NEW: Enable dark mode using 'class' strategy
  // This means dark mode is activated when 'dark' class is added to <html> element
  darkMode: 'class',

  theme: {
    extend: {}, // Custom theme extensions (none currently)
  },
  plugins: [], // Tailwind plugins (none currently)
};