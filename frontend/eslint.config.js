import antfu from "@antfu/eslint-config";

export default antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: "double", //  'double' or 'single'
        semi: true, // true or false
        usesemicolon: true, // true or false
        bracketSpacing: true, // true or false
        trailingComma: "all", // 'none', 'es5', 'all'
        arrowParens: "always", // 'always', 'avoid'
        endOfLine: "lf", // 'lf', 'crlf', 'cr'
        singleQuote: true, // true or false
        tabWidth: 4, // 4, or 'tab'
        useTabs: false, // true or false
    },

    react: true,
    typescript: true,
    vue: false,
    astro: true,
    markdown: false,

    rules: {
        "no-console": "off",
        "curly": ["error", "all"],
        "node/prefer-global/process": "off",
    },

    jsonc: false,
    yaml: false,
});
