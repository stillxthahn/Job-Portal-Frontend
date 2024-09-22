/** @type {import('tailwindcss').Config} */

import scrollbar from "tailwind-scrollbar";
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {},
  container: {
   center: true,
   screens: {
    xsm: "450px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1800px",
    "2xl": "1800px",
   },
  },
 },
 plugins: [
  scrollbar({ nocompatible: true }),
  scrollbar({ preferredStrategy: "pseudoelements" }),
 ], // default: 'standard'],
};
// exports = {
//  corePlugins: {
//   preflight: true,
//  },
// };
