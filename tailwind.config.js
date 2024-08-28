/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Tailwind가 스캔할 파일 경로
    './public/index.html',          // 일반적으로 HTML 파일 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
