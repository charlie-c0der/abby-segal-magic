import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'

const shared = {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'error',
  'prefer-const': 'error',
  'no-var': 'error',
}

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      ...shared,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      ...shared,
    },
  },
  // Lint .vue templates + scripts (correctness-focused; vue-tsc handles types)
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      ...shared,
      // Page/view components are intentionally single-word (Home, About, Art…)
      'vue/multi-word-component-names': 'off',
      // All v-html was removed — keep it out (XSS surface)
      'vue/no-v-html': 'error',
    },
  },
]
