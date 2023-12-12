---
layout: home

title: Pinia
titleTemplate: Memória Intuitiva para Vue.js

hero:
  name: Pinia
  text: Memória Intuitiva para Vue.js
  tagline: Tipos Seguros, Extensível, e Modular por padrão. Não notaremos a diferença.
  image:
    src: /logo.svg
    alt: Pinia
  actions:
    - theme: brand
      text: Começar
      link: /introduction
    - theme: alt
      text: Demonstração
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite
    - theme: cta mastering-pinia
      text: ' '
      link: https://masteringpinia.com
    - theme: cta vueschool
      text: Assistir Vídeo Introdutório
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: Obter a Folha de Consulta da Pinia
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  - title: 💡 Intuitiva
    details: As memorias são tão familiares quanto os componentes. API desenhada para deixar-te escrever memorias bem organizadas.
  - title: 🔑 Tipo Seguro
    details: Os tipos são inferidos, o que significa que a memoria fornece-te conclusão automática até mesmo na JavaScript.
  - title: ⚙️ Suporte da Ferramenta de Programação
    details: Gatilhos da Pinia dentro da ferramenta de programação da Vue para dar-nos uma experiência de desenvolvimento aprimorada em ambas Vue 2 e Vue 3.
  - title: 🔌 Extensível
    details: Reage as mudanças na memória para estender a Pinia com transições, sincronização de armazenamento local, etc.
  - title: 🏗 Modular por padrão
    details: Construia várias memorias e deixe o teu empacotador separar o código delas automaticamente.
  - title: 📦 Extremamente leve
    details: Pinia pesa por volta de ~1.5kb, nem perceberás a presença dela!
---

<script setup>
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
import './.vitepress/theme/styles/home-links.css'
</script>

<HomeSponsors />