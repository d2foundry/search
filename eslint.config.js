export default [
  {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      project: ["tsconfig.json"],
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    files: ["src/**/*.ts", "src/**/*.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      project: ["tsconfig.json"],
      sourceType: "module",
    },
    rules: {
      "arrow-body-style": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
    },
  },
];
