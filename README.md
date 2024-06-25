# Frc-ui-pro

Frc-ui-pro 是基于 Ant Design 设计体系，二次封装的 React UI 组件库，主要用于研发企业级中后台产品。

## ✨ 特性

🌈 提炼自企业级中后台产品的交互语言和视觉风格。

📦 开箱即用的高质量 React 组件。

🛡 使用 TypeScript 开发，提供完整的类型定义文件。

⚙️ 全链路开发和设计工具体系。

## 安装

```shell
$npm install frc-ui-pro --save
```

## 引入样式文件

```js
import "frc-ui-pro/dist/src/styles/global/index.css";
```

## 使用

```js
import { Button } from "frc-ui-pro";

ReactDOM.render(<Button>Frc Button</Button>, mountNode);
```

## 安装 node-sass失败

查找和 node 版本对应的 node-sass ，比如 node 18 使用 node-sass 8+ 即可

```shell
npm install node-sass@^8.0.0 --registry=https://registry.npmmirror.com --sass_binary_site=https://www.npmmirror.com/mirrors/node-sass/

```
