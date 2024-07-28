<script>
export default {
  props: ['searched'],

  data() {
    return {
      movieList: [],
      query: this.searched,
      loading: true
    }
  },

  async beforeMount() {
    await this.search()
  },

  watch: {
    '$route.query.q': 'search'
  },

  methods: {
    async search() {
      this.loading = true
      this.query = this.$route.query.q || ''

      if (!this.query) {
        this.movieList = []
        return
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=f3772eb12fa502a02619cd4d5d529b59&query=${this.query}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzc3MmViMTJmYTUwMmEwMjYxOWNkNGQ1ZDUyOWI1OSIsIm5iZiI6MTcyMTEzMDczMy45ODQwNzIsInN1YiI6IjY2OTY1YmNjNDlmYTZmODA3MWQ1ZmMzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NRlb8vI4hhjjlXwa2Ssh39GBqYbHbMRBefwkUUDgbK8',
              accept: 'application/json'
            }
          }
        )
        const data = await response.json()
        this.movieList = data.results
      } catch (error) {
        console.error('ERROR: ', error)
        this.movieList = []
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    },

    shorten(desc) {
      return desc ? desc.substring(0, 4) : null
    }
  }

  // created() {
  //   this.search()
  // }
}
</script>

<template>
  <div v-if="loading" class="bg-[#101f2e] text-white font-bold text-5xl pt-2 mt-[57px] pb-4">
    <h3 class="text-lg font-semibold ml-4 mb-4 text-white z-[1]">
      Showing results for <em class="text-xl font-bold">{{ query }}</em>
    </h3>
    <ul class="flex flex-wrap justify-center pb-6">
      <li v-for="n in 18" :key="n" class="pb-6">
        <div class="h-[18rem] w-[12rem] rounded-md mr-8 mb-8 bg-gray-700 animate-pulse">
          <div
            class="h-full w-full bg-gradient-to-t from-black to-transparent rounded-md flex flex-col justify-end"
          >
            <div class="w-3/4 h-6 bg-gray-600 rounded mb-2 ml-2"></div>
            <div class="w-1/3 h-4 bg-gray-600 rounded mb-2 ml-2"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div v-else-if="movieList.length" class="bg-[#101f2e] pt-2 mt-[57px]">
    <h3 class="text-lg font-semibold ml-4 mb-4 text-white z-[1]">
      Showing results for <em class="text-xl font-bold">{{ query }}</em>
    </h3>
    <ul class="flex flex-wrap justify-center pb-6">
      <li v-for="movie in movieList" :key="movie.id" class="pb-6">
        <router-link :to="`/movies/${movie.id}`" class="w-fit">
          <div
            class="h-[18rem] w-[12rem] rounded-md mr-8 mb-8 hover:h-[16rem] duration-500 cursor-pointer"
            :style="{
              backgroundImage: 'url(https://image.tmdb.org/t/p/original' + movie.poster_path + ')',
              backgroundPosition: 'center center',
              backgroundSize: 'contain'
            }"
          >
            <div
              class="text-white flex flex-col justify-end bg-gradient-to-t from-black to-transparent w-48 h-72 rounded-md relative pb-2"
            >
              <span class="p-2 flex justify between pb-0">
                <span class="font-bold text-2xl mr-1 w-48">{{ movie.title }}</span>
                <span class="absolute bottom-2 right-1">[{{ shorten(movie.release_date) }}]</span>
              </span>
              <p class="pl-2"><span class="text-yellow-500">★</span> {{ movie.vote_average }}/10</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

  <div v-else class="bg-[#101f2e] pt-2 mt-[57px] h-full">
    <h3 class="text-lg font-semibold ml-4 mb-4 text-white z-[1]">
      No results found for <em class="text-xl font-bold">{{ query }}</em>
    </h3>
  </div>
</template>
