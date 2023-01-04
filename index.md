---
home: true
heroImage: /logo.svg
actionText: Começar
actionLink: /introduction.html

altActionText: Demonstração
altActionLink: https://stackblitz.com/github/piniajs/example-vue-3-vite

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
footer: MIT Licensed | Copyright © 2019-present Eduardo San Martin Morote
---

<ClientOnly>
  <ThemeToggle/>
  <!-- <TestStore/> -->
</ClientOnly>

<HomeSponsors />

<script setup>
import HomeSponsors from './.vitepress/components/HomeSponsors.vue'
import ThemeToggle from './.vitepress/components/ThemeToggle.vue'
// import TestStore from './.vitepress/components/TestStore.vue'
</script>
