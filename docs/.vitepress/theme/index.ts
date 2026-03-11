// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {inject} from '@vercel/analytics'
import './style.css'
import OAuthSuccessComponent from '../components/OAuthSuccessComponent.vue'
import BindComponent from "../components/BindComponent.vue";
import CustomFooter from "../components/CustomFooter.vue";  // 引入 footer

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(CustomFooter)  // 注入到底部 slot
        })
    },
    enhanceApp({app}) {
        inject()
        app.component('OAuthSuccessComponent', OAuthSuccessComponent)
        app.component('BindComponent', BindComponent)
    }
} satisfies Theme