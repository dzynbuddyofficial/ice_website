module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        notoOriya: ["'Noto Sans Oriya'", "sans-serif"],
      },
      colors: {
        ice: {
          red: "#E53935",
          yellow: "#FFB300",
          black: "#212121",
          white: "#FFF8E1",
        },
      },
    },
  },
  plugins: [],
};
