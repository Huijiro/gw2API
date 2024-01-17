/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "plugin:@typescript-eslint/strict-type-checked", "plugin:prettier/recommended", "prettier"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.spec.json"],
    tsconfigRootDir: __dirname,
  },
};
