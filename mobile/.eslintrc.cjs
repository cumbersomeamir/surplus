module.exports = {
  root: true,
  extends: ['@react-native/eslint-config', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};

