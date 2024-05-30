module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Indentation and Formatting
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],

    // Variables and Declarations
    'no-var': ['error'],

    // Functions
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'no-confusing-arrow': ['error'],

    // Objects and Arrays
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'object-shorthand': ['error', 'always'],

    // Strings
    'template-curly-spacing': ['error', 'always'],

    // ES6 Features
    'prefer-template': ['error'],

    // Best Practices
    'no-console': ['error'],

    // Imports and Exports
    'import/extensions': ['error', 'always'],

    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
  },
};
