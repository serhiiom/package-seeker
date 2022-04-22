module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'no-unused-vars': 'warn',
    'no-return-await': 'error',
    'prettier/prettier': 'warn'
  }
}
