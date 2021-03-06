module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'react-hooks', 'react', '@typescript-eslint', 'import'],
  rules: {
    'global-require': 0,
    'prettier/prettier': 'error',
    'jsx-a11y/anchor-is-valid': 0,
    'no-param-reassign': 0,
    radix: 0,
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'import/no-absolute-path': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0, // TODO あとで消す
    '@typescript-eslint/no-explicit-any': 0, // TODO あとで消す
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'no-console': 0,
    'react/no-danger': 0,
    'react/display-name': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'no-shadow': 0,
    'no-return-assign': 0,
    'no-restricted-globals': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/interactive-supports-focus': 0
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {}
    }
  }
};
