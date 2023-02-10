module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["prettier", "eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 2021,
  },
  plugins: [],
  // add your custom rules here
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
