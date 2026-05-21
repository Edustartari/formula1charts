import unusedImports from "eslint-plugin-unused-imports";
import react from "eslint-plugin-react";

export default [{
  files: ["src/**/*.{js,jsx}"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      window: "readonly",
      document: "readonly",
      console: "readonly",
      module: "readonly",
      require: "readonly",
      process: "readonly",
      __dirname: "readonly",
      __filename: "readonly"
    }
  },
  plugins: {
    "unused-imports": unusedImports,
    "react": react
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}];