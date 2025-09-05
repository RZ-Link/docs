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
            {text: 'Linux', link: '/linux/'},
            {text: 'Python', link: '/python/'},
            {text: 'OpenStack', link: '/openstack/'},
        ],

        sidebar: {
            '/linux/': [
                {
                    text: 'Linux',
                    items: [
                        {text: 'Index', link: '/linux/'},
                        {text: 'Create Local Debian Repository', link: '/linux/create-local-debian-repository'},
                        {text: 'Create Local YUM Repository', link: '/linux/create-local-yum-repository'},
                    ]
                }
            ],
            '/python/': [
                {
                    text: 'Python',
                    items: [
                        {text: 'Index', link: '/python/'},
                        {text: 'pip', link: '/python/pip'},
                        {text: 'venv', link: '/python/venv'},
                    ]
                }
            ],
            '/openstack/': [
                {
                    text: 'OpenStack',
                    items: [
                        {text: 'Index', link: '/openstack/'},
                        {text: 'heat-templates', link: '/openstack/heat-templates'},
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/RZ-Link/docs'}
        ]
    }
})
