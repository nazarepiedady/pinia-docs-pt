import { defineConfig } from 'vitepress'
import { ptConfig } from './pt'
import { sharedConfig } from './shared'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: {
      label: 'Português',
      lang: 'pt-PT',
      link: '/',
      ...ptConfig
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: 'https://pinia.vuejs.org/'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: 'https://pinia.vuejs.org/zh/'
    },
    es: {
      label: 'Español',
      lang: 'es-ES',
      link: 'https://es-pinia.vercel.app'
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: 'https://pinia.vuejs.kr/'
    },
    uk: {
      label: 'Українська',
      lang: 'uk-UA',
      link: 'https://pinia-ua.netlify.app',
    },
    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: 'https://pinia-ru.netlify.app',
    },
  },
})