/**
 * @type {import("prettier").Config}
 * Need to restart IDE when changing configuration
 */
const config = {
  // Basic formatting
  semi: true,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  printWidth: 80,

  // Quotes
  singleQuote: true,
  jsxSingleQuote: false,

  // Trailing commas
  trailingComma: 'all',

  // Spacing
  bracketSpacing: true,
  bracketSameLine: false,

  // Arrow functions
  arrowParens: 'always',
};

export default config;
