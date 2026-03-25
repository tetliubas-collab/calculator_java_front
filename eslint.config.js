import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      // Заборона невикористаних змінних (як у завданні)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Заборона console.log у продакшн коді
      'no-console': 'warn',
      // Vue специфічні правила
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      // Одинарні лапки
      'quotes': ['error', 'single'],
      // Крапка з комою
      'semi': ['error', 'never']
    }
  }
]
