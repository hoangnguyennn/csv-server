module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    quotes: ["error", "double"],
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  env: {
    node: true,
    es6: true,
  },
};
