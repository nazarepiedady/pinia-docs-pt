---
layout: home

title: Pinia
titleTemplate: A Memória Intuitiva para Vue.js

hero:
  name: Pinia
  text: A Memória Intuitiva para Vue.js
  tagline: Tipagem Segura, Extensível, e Modular por padrão. Esqueça que estás a usar uma memória.
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
    - theme: cta vueschool
      text: Assista Um Vídeo Introdutório
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: Receba o Pinia Cheat Sheet
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  - title: 💡 Intuitiva
    details: As memorias são tão familiares quanto os componentes. API desenhada para deixar-te escrever memorias bem organizadas.
  - title: 🔑 Tipo Seguro
    details: Os tipos são inferidos, o que significa que a memoria fornece-te conclusão automática até mesmo na JavaScript.
  - title: ⚙️ Suporte de Ferramenta do Programador
    details: Gatilhos de Pinia dentro da ferramenta do programador de Vue para dar-te uma experiência de desenvolvimento aprimorada em ambos Vue 2 e Vue 3.
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