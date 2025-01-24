import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/docs/',
    title: "RZ-Link Docs",
    description: "A VitePress Site",
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'linux', link: '/linux/'}
        ],

        sidebar: {
            '/linux/': [
                {
                    text: 'linux',
                    items: [
                        {text: 'Index', link: '/linux/'},
                        {text: 'Create Local Debian Repository', link: '/linux/create-local-debian-repository'},
                    ]
                }
            ],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
