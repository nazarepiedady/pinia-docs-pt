import { h } from 'vue'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import './styles/playground-links.css'
import AsideSponsors from './components/AsideSponsors.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
import VueMasteryLogoLink from './components/VueMasteryLogoLink.vue'


const theme: Theme = {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'home-features-after': () => h(HomeSponsors),
      'aside-ads-before': () => h(AsideSponsors),
    })
  },

  enhanceApp({ app }) {
    app.component('VueSchoolLink', VueSchoolLink)
    app.component('VueMasteryLogoLink', VueMasteryLogoLink)
  },
}

export default theme