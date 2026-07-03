# 申万行业行情实时看板

基于 Astro 构建的申万行业实时行情看板，展示六大风格板块、一级行业和二级行业的实时指数行情。

## 数据来源

- **实时行情**：申万宏源研究官方指数（通过 akshare 获取）
- **行业分类**：申万行业分类 2021 版（31 个一级行业、134 个二级行业）
- **后端**：腾讯云 CloudBase 云函数（Python + akshare）

## 技术栈

- [Astro 5](https://astro.build/) — 静态站点生成
- ECharts — 数据可视化
- CloudBase （腾讯云开发）— Serverless 后端
- GitHub Pages — 前端部署

## 本地运行

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── pages/
│   └── index.astro       # 主页面（三 Tab：六大风格/一级/二级）
├── layouts/
│   └── BaseLayout.astro   # 基础布局
├── styles/
│   └── global.css         # 全局样式（深色主题）
└── lib/
    ├── api.js             # API 封装 & 格式化工具
    └── hierarchy.js       # 行业层级数据
data/                      # 申万行业层级关系 JSON
cloudbase/functions/       # CloudBase 云函数源码
```

## 在线访问

https://morecorianders.github.io/sw-industry-dashboard/
