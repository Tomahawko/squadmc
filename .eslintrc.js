module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": "off",
    quotes: ["error", "double"],
    "no-mixed-operators": "off",
    "linebreak-style": "off",
    "max-len": ["error", 120],
    "prefer-destructuring": "off",
    "no-plusplus": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
