<script>
import BannerMovie from './BannerMovie.vue'
export default {
  components: {
    BannerMovie
  },

  data() {
    return {
      popularMovieList: [],
      topRatedMovieList: [],
      upcomingMovieList: [],
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
      try {
        this.topRatedMovieList = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=f3772eb12fa502a02619cd4d5d529b59'
        )
          .then((response) => response.json())
          .then((data) => data.results)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }

      try {
        this.popularMovieList = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=f3772eb12fa502a02619cd4d5d529b59'
        )
          .then((response) => response.json())
          .then((data) => data.results)
          .catch((error) => console.error('Error:', error))
      } catch (error) {
        console.log('ERROR:', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
      try {
        this.upcomingMovieList = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=f3772eb12fa502a02619cd4d5d529b59'
        )
          .then((response) => response.json())
          .then((data) => data.results)
          .catch((error) => console.error('Error:', error))
      } catch (error) {
        console.log('ERROR:', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    },

    shorten(desc) {
      return desc ? desc.substring(0, 4) : null
    }
  },
  created() {
    this.search()
  }
}
</script>

<template>
  <BannerMovie />

  <div v-if="loading" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">POPULAR MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6">
      <li v-for="n in 6" :key="n" class="pb-6">
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

  <div v-else-if="popularMovieList.length" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">POPULAR MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6 pl-2 duration-300 transition">
      <li v-for="movie in popularMovieList" :key="movie.id" class="mb-6 mr-2">
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
    <hr class="mx-5 border-none h-[1px] bg-slate-400" />
  </div>
  
  <div v-if="loading" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">UPCOMING MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6">
      <li v-for="n in 6" :key="n" class="pb-6">
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

  <div v-else-if="upcomingMovieList.length" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">UPCOMING MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6 pl-2 duration-300 transition">
      <li v-for="movie in upcomingMovieList" :key="movie.id" class="mb-6 mr-2">
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
    <hr class="mx-5 border-none h-[1px] bg-slate-400" />
  </div>

  <div v-if="loading" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">TOP-RATED MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6">
      <li v-for="n in 6" :key="n" class="pb-6">
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

  <div v-else-if="topRatedMovieList.length" class="bg-[#101f2e] pt-2">
    <h3 class="text-4xl font-semibold ml-5 mb-8 mt-3 text-white z-[1]">TOP-RATED MOVIES</h3>
    <ul class="flex flex-wrap justify-center pb-6 pl-2 duration-300 transition">
      <li v-for="movie in topRatedMovieList" :key="movie.id" class="mb-6 mr-2">
        <router-link :to="`/movies/${movie.id}`" class="w-fit">
          <div
            class="h-[18rem] w-[12rem] rounded-md mr-8 mb-8 hover:h-[16rem] hover:mb-16 duration-500 cursor-pointer"
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
    <hr class="mx-5 border-none h-[1px] bg-slate-400" />
  </div>
  <div v-else class="bg-[#101f2e] h-screen text-white font-bold text-5xl pt-2 mt-[57px] pb-4">
    Loading...
  </div>
</template>
