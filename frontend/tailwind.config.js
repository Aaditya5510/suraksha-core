/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#0b0f19',
        cardDark: '#111827',
        borderDark: '#1f2937',
        alertRed: '#ef4444',
        warnAmber: '#f59e0b',
        safeGreen: '#10b981',
        infoBlue: '#3b82f6',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
