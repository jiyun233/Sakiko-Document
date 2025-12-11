// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import OAuthSuccessComponent from '../components/OAuthSuccessComponent.vue'
import BindComponent from "../components/BindComponent.vue";

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {})
    },
    enhanceApp({app, router, siteData}) {
        app.component('OAuthSuccessComponent', OAuthSuccessComponent)
        app.component('BindComponent', BindComponent)
    }
} satisfies Theme
