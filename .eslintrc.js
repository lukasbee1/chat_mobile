module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  globals: {
    fetch: false,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-named-as-default': 0,
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
  },
};
