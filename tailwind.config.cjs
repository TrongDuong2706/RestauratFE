/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Bật chế độ JIT
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Đường dẫn đến các tệp nguồn
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
