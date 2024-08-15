<script>
export default {
  data() {
    return {
      movies: [],
      bannerMovie: null,
      loading: true
    }
  },

  //life cycle hooks need to be defined outside
  async beforeMount() {
    await this.getMovies()
  },

  methods: {
    async getMovies() {
      this.loading = true
      try {
        this.movies = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=f3772eb12fa502a02619cd4d5d529b59'
        )
          .then((response) => response.json())
          .then((data) => data.results)
        if (this.movies.length > 0) {
          this.bannerMovie = this.movies[this.getRandomInt(0, this.movies.length)]
        }
      } catch (error) {
        console.log('ERROR:', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1300)
      }
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
  },

  computed: {
    background() {
      return this.bannerMovie ? this.bannerMovie.backdrop_path : ''
    },
    id() {
      return this.bannerMovie ? this.bannerMovie.id : null
    },
    description() {
      return this.bannerMovie ? this.bannerMovie.overview.substring(0, 70) + '...' : null
    }
  }
}
</script>

<template>
  <div v-if="loading" class="w-screen h-[85vh] bg-gray-800 ">
    <!-- Skeleton loader content -->
    <div class="text-white pl-[5.5rem] pr-[4rem] flex flex-col justify-center w-full h-full animate-pulse">
      <div class="w-3/4 h-24 bg-gray-700 mb-5 rounded-lg"></div>
      <div class="w-28 h-8 bg-gray-700 mb-5 rounded-lg"></div>
      <div class="w-1/2 h-20 bg-gray-700 mb-5 rounded-lg"></div>
      <div class="w-36 h-14 bg-gray-700 rounded-lg"></div>
    </div>
  </div>

  <div v-else-if="bannerMovie">
    <div
      class="w-screen h-[85vh]"
      :style="{
        backgroundImage: 'url(https://image.tmdb.org/t/p/original' + background + ')',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }"
    >
      <div
        class="text-white pl-[4.5rem] pr-[4rem] flex flex-col justify-center w-full h-full bg-gradient-to-r from-black to-transparent"
      >
        <h1 class="text-8xl font-bold">{{ bannerMovie.title }}</h1>
        <p class="pl-1 mt-3 font-bold text-2xl">
          <span class="text-yellow-500 pr-2">★</span> {{ bannerMovie.vote_average }}
        </p>
        <p class="mt-3 w-1/2 ml-1.5 text-base text-neutral-400">
          {{ this.bannerMovie.overview }}
        </p>
        <router-link :to="`/movies/${id}`" class="w-fit">
          <button
            class="flex items-center gap-1 px-6 py-4 rounded-lg text-md bg-green-700 w-fit mt-4 ml-2 duration-300 hover:bg-neutral-800 font-semibold active:bg-neutral-500 "
          >
            <span>View more ➤</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
*,
::before,
::after {
  box-sizing: border-box;
}
</style>
