<script>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import PageFooter from './components/PageFooter.vue'

export default {
  components: { NavBar, RouterView, PageFooter }
}
</script>

<template>
  <NavBar />

    <router-view />

  <PageFooter />
</template>


