module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: ['airbnb', 'airbnb-typescript/base'],
  rules: {
    'no-console': 0,
    'comma-dangle': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': 0,
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'import/no-cycle': 0,
    'camelcase': 0,
    '@typescript-eslint/camelcase': 0
  },
  settings: {
    'import/resolver': {
      node: {
        paths: 'src',
        extensions: ['.js' ,'.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  }
};
