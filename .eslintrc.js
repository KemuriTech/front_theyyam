module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "plugin:vue/vue3-essential",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "indent" : ['error', 2],
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
  }
}
