const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  flyonui: {
    themes: ["light", "dark", "gourmet", "corporate", "luxury", "soft"]
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors()
  ]
};
