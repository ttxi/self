# prettierr

js

```js
// prettier.config.js or .prettierrc.js
module.exports = {
  tabWidth: 2, //
  useTabs: false, //
  semi: false, //  在语句末尾打印分号。
  singleQuote: false, // 使用单引号而不是双引号。
  quoteProps: 'as-needed', // 引用对象中的属性时更改。 https://prettier.io/docs/en/options.html#quote-props
  jsxSingleQuote: false, //
  trailingComma: 'none', //  尾随逗号
  bracketSpacing: true, // 打印对象字面量中括号之间的空格。
  bracketSameLine: false, //  将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。
  arrowParens: 'avoid', // 在唯一的箭头函数参数周围包含括号。"always"- 始终包括父母。例子：(x) => x |||||| "avoid"- 尽可能省略括号。例子：x => x
  htmlWhitespaceSensitivity: 'ignore', // HTML 空白敏感度
  vueIndentScriptAndStyle: false, // Vue 文件脚本和样式标签缩进 <script>Vue 文件中的代码和标签是否缩进<style>。
};
```

prettier.json

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": false,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": false
}
```
