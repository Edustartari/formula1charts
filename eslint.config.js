module.exports = [
  {
    ignores: [
      'node_modules/**',
      'static/**',
      'templates/**',
      'src/img/**',
      '*.config.js',
      'build/**',
      'dist/**',
      '__pycache__/**',
      '*.pyc',
    ],
  },
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      // Error on unused variables
      'no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      }],
      // Error on undefined variables
      'no-undef': 'error',
      // Warn on console statements
      'no-console': 'warn',
      // Other useful rules
      'no-debugger': 'warn',
      'no-alert': 'warn',
    },
  },
];
