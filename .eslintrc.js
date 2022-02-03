module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        ...['png', 'scss', 'css', 'json', 'jpg', 'svg'].reduce(
          (acc, k) => ({ ...acc, [k]: 'always' }),
          {},
        ),
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'object-curly-newline': 0,
    'arrow-parens': 0,
  },
};
