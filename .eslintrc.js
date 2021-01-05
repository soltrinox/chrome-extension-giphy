module.exports = {
  extends: ['@gunnarx2/eslint-react'],
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
      }
    ]
  }
};
