export default [
  {
    ignores: ['dist', 'node_modules', '.vite', 'build'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'warn',
    },
  },
]
