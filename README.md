# Vue3 组件库

## 1.环境搭建

```sh
npm install pnpm -g
pnpm init


```

创建配置文件.npmrc

```
shamefully-hoist = true # 安装依赖到node_modules下

```

```sh
pnpm install vue typescript
```

配置 tsconfig.json
配置 pnpm-workspace.yaml

在 packages/components, packages/theme-chalk, packages/utils 下执行 pnpm init 生成 package.json 文件。在根目录下执行以下命令，将依赖模块安装到根目录下，以便项目下都可以引用

```
pnpm install @zy-plus/components @zy-plus/theme-chalk @zy-plus/utils -w
```

## 2.play 目录环境安装

```
pnpm create vite play --template vue-ts
```

根目录下创建 typings/vue-shim.d.ts

```js
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

根目录下的 script 命令配置 执行 play 目录下的 dev 命令

```
"dev": "pnpm -C play dev"
```

## 3.BEM 规范

## 4. Eslint

使用 vscode 安装 volar 和 eslint 插件

```
PS D:\programs\zy-plus> npx eslint --init
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes  YES
√ Where does your code run? · browser, node
√ What format do you want your config file to be in? · JavaScript
eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
√ Would you like to install them now with npm? · No / Yes    NO   # 默认会使用npm安装 我们需要手动使用pnpm安装
```

当前 生成的 .eslintrc.js 配置 默认是支持 vue2 的，我们需要修改成支持 vue3
额外安装支持 vue 中 ts 的 eslint 配置依赖

```
pnpm i @vue/eslint-config-typescript -D -w
```

.eslintrc.js .eslintignore 配置

## 5. prettier

.prettierrc.js .prettierignore 安装 vscode prettier 插件
vscode 首选项设置:

1. Editor: Default Formatter 选择 prettier
2. Editor: Format On Save 勾选

> git 时提示 warning: LF will be replaced by CRLF
> 解决办法： git config --global core.autocrlf false 设置为默认不转义

## 6. husky

增加 eslint script 命令

```
"lint": "eslint packages play --fix --ext .ts,.tsx,.vue,.js,.jsx --quiet "
```

安装 husky 和 lint, 使用 mrm 会自动添加 prepare 命令，自动生成 pre-commit 文件等

```
pnpm install mrm husky lint-staged -w -D
npx mrm lint-staged
```

修改 husky 和 lint-staged 命令

```
# 生成husky目录文件
"prepare": "husky install"
```

## 7. 代码提交检测

```sh
# $1 字符需要自己添加到配置文件中 .husky/commit-msg
pnpm install @commitlint/cli @commitlint/config-conventional -D -w
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

配置 commitlint.config.js

## 遇到的问题

1. unplugin-vue-define-options 插件 使用 defineOptions 报错问题

- tsconfig.json 中配置

```json
 "types": ["unplugin-vue-define-options/macros-global" /* ... */]
```

- eslint 中配置

```js
globals: {
  defineOptions: 'writable'
}
```

## 8. svg 图标

https://xicons.org/#/

```sh
# play目录下
pnpm i @vicons/ionicons5
```
