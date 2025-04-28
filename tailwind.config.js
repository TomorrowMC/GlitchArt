import { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Important: Scans your app directory
  ],
  theme: {
    extend: {
      // You can add custom theme extensions here later if needed
      fontFamily: {
         // Optional: Define Tahoma specifically for popups if needed
         'tahoma': ['Tahoma', 'sans-serif'],
       },
    },
  },
  plugins: [],
};
export default config;