const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

module.exports = {
  content: [
    "./node_modules/flyonui/dist/js/accordion.js",
    "../path/to/notyf/**/*.js"
  ],
  flyonui: {
    vendors: true // Enable vendor-specific CSS generation
  },
  plugins: [tailwindcss, autoprefixer]
};
