module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    "requireConfigFile": false
  },
  rules: {
    // @ts-ignore
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // @ts-ignore
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"], //需要忽略的组件名
      },
    ]
  }
}
