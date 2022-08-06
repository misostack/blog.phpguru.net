module.exports = {
  purge: [
    "../../../themes/2022/layouts/*.html",
    "../../../themes/2022/layouts/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#E51B23",
      },
      fontFamily: {
        body: ["arial"],
        heading: ["'Merriweather', serif"],
      },
      textColor: {
        primary: "#E51B23",
      },
      backgroundColor: {
        primary: "#8cc43d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
