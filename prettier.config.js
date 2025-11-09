/**
 * @see https://prettier.io/docs/en/options.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: false,
  bracketSameLine: false, // JSX bracket rule (replaces jsxBracketSameLine)
  arrowParens: "avoid",
  endOfLine: "lf", // CI/CD 호환성 높음
  htmlWhitespaceSensitivity: "css",
  proseWrap: "always", // markdown 자동 줄바꿈 일관성 유지
  requirePragma: false,
  insertPragma: false,
  overrides: [
    {
      files: ["*.ts"],
      options: { parser: "typescript" },
    },
    {
      files: ["*.tsx"],
      options: { parser: "typescript" },
    },
    {
      files: ["*.html"],
      options: { parser: "html" },
    },
    {
      files: ["*.json"],
      options: { parser: "json-stringify", printWidth: 200 },
    },
  ],
};

export default config;
