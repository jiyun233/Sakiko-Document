import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Sakiko-ChuniBot",
    description: "A QQ bot for the rhythm game Chunithm",
    lastUpdated: true,
    base: "/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: "首页", link: "/"},
            {text: "使用指南", link: "/guide/account"}
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "使用指南",
                    collapsed: false,
                    items: [
                        {text: "绑定账号", link: "/guide/account"},
                        {text: "切换查分器", link: "/guide/api"},
                        {text: "机厅人数", link: "/guide/arcade"},
                        {text: "牌子进度", link: "/guide/progress"},
                        {text: "成绩工具", link: "/guide/tools"},
                        {text: "其它功能", link: "/guide/misc"}
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/jiyun233'}
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2021-present Origin Technology'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        search: {
            provider: 'local'
        },

        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },

        darkModeSwitchLabel: '外观',

        returnToTopLabel: '返回顶部',

        sidebarMenuLabel: '菜单',

        outline: {
            label: '本页目录'
        }
    }
})
