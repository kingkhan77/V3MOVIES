<script>
import router from '@/router'

export default {
  data() {
    return {
      search: '',
      moviesList: []
    }
  },

  methods: {
    async searchMovies() {
      if (this.search.trim() != '') {
        router.push({
          name: 'MovieList',
          query: {
            q: this.search
          }
        })
      }
    }
  }
}
</script>

<template>
    <header
    class="fixed top-0 w-full flex items-center justify-center px-[16px] py-[10px] bg-[#101f2e]  z-[1] border-b-[px] shadow-black shadow-2xl flex-wrap "
  >
    <router-link to="/">
      <h1 class="text-white font-semibold text-4xl font-[Roboto]" @click="this.search=''">
        <span class="text-[#42B883] ">V3</span>MOVIES
      </h1>
    </router-link>
    <form @submit.prevent="searchMovies">
      <input
        v-model="search"
        class="w-[18%] mr-4 px-2 pl-3 py-2 border-none text-lg outline-none rounded-full absolute right-8 top-[7.5px] bg-[#e5e7eb13] text-white"
        placeholder="Search movie..."
        type="text"
      />
      <button class="absolute right-14 top-[17px] text-xl" type="submit">🔍</button>
    </form>
  </header>
</template>
