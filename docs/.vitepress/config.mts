import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "净值分位",
  description: "Index Fund Mini Program",
  head: [["link", { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "使用指南", link: "/guide" },
      { text: "图片识别", link: "/image-recognition" },
    ],

    sidebar: [
      {
        text: "使用指南",
        items: [{ text: "使用指南", link: "/guide" }],
      },
      {
        text: "图片识别",
        items: [{ text: "图片识别", link: "/image-recognition" }],
      },
      // {
      //   text: "Examples",
      //   items: [
      //     { text: "Markdown Examples", link: "/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/api-examples" },
      //   ],
      // },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/GuoXiCheng/fund" }],
  },
});
