/*@type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      scrollbar: {
        width: '1px',
        track: 'bg-[#555]',
        thumb: 'bg-[#121212] rounded-[5px]',
        'thumb:hover': 'bg-[#242424]',
      },
    },

  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar-daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}

