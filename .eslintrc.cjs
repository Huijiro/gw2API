/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "plugin:@typescript-eslint/strict-type-checked", "prettier", "plugin:prettier/recommended"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
