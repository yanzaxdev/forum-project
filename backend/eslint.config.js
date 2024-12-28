const {ESLint} = require('eslint');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files : ['**/*.ts', '**/*.tsx'],
    languageOptions : {
      parser : tsParser,
      parserOptions : {
        ecmaVersion : 'latest',
        sourceType : 'module',
        project : './tsconfig.json',
      },
    },
    plugins : {
      '@typescript-eslint' : tsPlugin,
    },
    rules : {
      'no-console' : ['error', {allow : ['warn', 'error']}],
                   ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type' : 'warn',
      '@typescript-eslint/no-explicit-any' : 'warn',
      '@typescript-eslint/no-unsafe-assignment' : 'warn',
      '@typescript-eslint/no-unused-vars' :
                                          ['warn', {argsIgnorePattern : '^_'}],
    },
    ignores : ['dist/', 'node_modules/'],
  },
];