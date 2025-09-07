module.exports = {
  root: true,
  parser: 'vue-eslint-parser', 
  parserOptions: {
    parser: '@babel/eslint-parser', 
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', 
    'plugin:prettier/recommended' 
  ],
  rules: {
    'prettier/prettier': 'error', 
    'vue/no-unused-vars': 'warn' 
  }
}