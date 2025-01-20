/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Aqui ele irá buscar por classes nos arquivos .tsx e .ts dentro da pasta 'app'
    './pages/**/*.{js,ts,jsx,tsx}', // Se você estiver utilizando a pasta 'pages', adicione também aqui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
