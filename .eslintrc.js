module.exports = {
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["simple-import-sort", "unused-imports"],
  settings: {
    next: {
      rootDir: ["*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "simple-import-sort/imports": "error",
    "@next/next/no-img-element": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
};
