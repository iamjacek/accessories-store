module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      racing: ['"Racing Sans One"', "serif"],
    },
    inset: {
      "1/4": "25%",
      "1/2": "50%",
    },
    extend: {
      spacing: {
        96: "24rem",
        128: "32rem",
      },
    },
  },
  variants: {},
  plugins: [],
}
