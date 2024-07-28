<script>
import { Icon } from '@iconify/vue'
export default {
  components: { Icon },
  data() {
    return {
      movieId: '',
      movieDetail: [],
      loading : true
    }
  },

  created() {
    this.movieId = this.$route.params.id
  },

  async beforeMount() {
    await this.getMovieDetail()
    console.log(this.movieDetail)
  },

  methods: {
    async getMovieDetail() { 
      this.loading = true
      try{
      this.movieDetail = await fetch(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=f3772eb12fa502a02619cd4d5d529b59&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log('ERROR: ', error))
      }
      catch(error){
        console.log("ERROR:",error)
      }
      finally{
        setTimeout(()=>{
          this.loading = false
        },1500)
      }
      },

    transform(input) {
      // Convert all alphabets to lower-case
      let result = input.toLowerCase()

      // Change whitespaces to '-'
      result = result.replace(/\s+/g, '-')

      // Remove colon ':' from the end of the word if present
      result = result.replace(/:$/, '')

      return result
    }
  }
}
</script>

<template>

<div v-if="loading" class="w-screen h-full bg-gray-800 ">
    <!-- Skeleton loader content -->
    <div class="relative w-full h-full bg-gradient-to-t from-black to-transparent pb-10">
      <div class="w-full flex flex-col gap-y-12 h-full">
        <div class="h-[430px] w-[300px] ml-[20%] mt-48 rounded-xl bg-gray-700 animate-pulse"></div>
        <div class="flex flex-col  ml-[20%] mt-6 ">
          <div class="h-16 w-1/3 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
          <div class="mt-3 w-1/2 h-20 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
          <div class="flex flex-col text-lg gap-2 mt-3">
            <div class="h-8 w-1/4 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
            <div class="h-8 w-1/6 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
            <div class="h-8 w-1/3 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
            <div class="h-8 w-1/4 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
            <div class="h-8 w-1/4 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
            <div class="h-8 w-1/3 bg-gray-700 mb-4 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div v-else-if="movieDetail">
    <div class="relative w-screen">
      <div
        class="fixed top-0 left-0 w-full h-full grayscale-0 blur-[2px]"
        :style="{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/original' + movieDetail.backdrop_path + ')',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }"
      ></div>
      <div class="relative w-full h-full bg-gradient-to-t from-black to-transparent pb-10">
        <div class="w-full flex flex-col gap-y-32">
          <img
            class="h-[430px] w-[300px] ml-[20%] mt-48 rounded-xl "
            alt="Loading Image..."
            :src="'https://image.tmdb.org/t/p/original' + movieDetail.poster_path"
          />
          <div class="flex flex-col size-fit ml-[19%]">
            <h1 class="text-5xl text-yellow-500 font-bold pl-2 mb-4">
              {{ movieDetail.title }}
            </h1>
            <p class="mt-3 pl-2.5 w-1/2 text-base text-neutral-300">
              {{ movieDetail.overview }}
            </p>
            <div class="flex flex-col text-lg gap-2 mt-3">
              <div class="flex items-center gap-2 pl-2">
                <Icon icon="uiw:date" />
                <span>{{ movieDetail.release_date }}</span>
              </div>
              <p class="pl-1 font-mono">
                <span class="text-yellow-500 pl-1.5 text-xl">★</span>
                {{ Math.round(movieDetail.vote_average) }}/10
              </p>
              <div class="flex items-center gap-2 pl-2.5">
                <Icon icon="ion:people" />
                <span class="text-[17px]">{{ movieDetail.popularity }}</span>
              </div>
              <div class="flex items-center gap-2 pl-2.5 mb-5">
                <Icon icon="ic:twotone-access-time-filled" />
                <span class="text-[17px]"
                  >{{ Math.round(movieDetail.runtime / 60) }} hr
                  {{ Math.round(movieDetail.runtime % 60) }} min
                </span>
              </div>
            </div>
            <div
              class="mt-3 w-[50%] detail-infos flex flex-col gap-1 py-4 border-t-[1px] border-neutral-500 ml-3"
            >
              <h3 class="text-slate-500 font-medium text-[24px]">GENRES</h3>
              <div
                v-for="genre in movieDetail.genres"
                :key="genre.id"
                class="pl-0.5 text-[20px] text-[#cacedb]"
              >
                {{ genre.name }}
              </div>
            </div>
            <div
              class="w-[50%] mt-3 detail-infos flex flex-col gap-1 py-4 border-t-[1px] border-neutral-500 ml-3"
            >
              <h3 class="text-slate-500 font-medium text-[24px]">PRODUCTION COUNTRIES</h3>
              <div
                v-for="country in movieDetail.production_countries"
                :key="country.id"
                class="pl-0.5 text-[20px] text-[#cacedb]"
              >
                {{ country.name }}
              </div>
            </div>
            <div
              class="w-[50%] mt-3 detail-infos flex flex-col gap-1 py-4 border-t-[1px] border-neutral-500 ml-3"
            >
              <h3 class="text-slate-500 font-medium text-[24px]">LANGUAGE</h3>
              <div class="pl-0.5 text-[20px] text-[#cacedb]">
                {{ movieDetail.spoken_languages[0].english_name }}
              </div>
            </div>
            <div
              class="mt-3 detail-infos flex flex-col gap-1 py-4 w-[50%] border-t-[1px] border-neutral-500 ml-3"
            >
              <h3 class="text-slate-500 font-medium text-[24px] mb-3">PRODUCTION COMPANIES</h3>
              <div
                v-for="company in movieDetail.production_companies"
                :key="company.id"
                class="pl-0.5 text-[20px] text-[#cacedb]"
              >
                <img
                  v-if="company.logo_path"
                  :src="'https://image.tmdb.org/t/p/w500' + company.logo_path"
                  :alt="company.name"
                  class="h-6 bg-white p-1"
                />
                {{ company.name }}
              </div>
            </div>
            <div class="border-t-[1px] border-neutral-500 ml-3 w-[50%] text-blue-500 mt-3 pt-3">
              <h3 class="text-slate-500 font-medium text-[24px]">SOURCE</h3>
              <a :href="'https://www.imdb.com/title/' + movieDetail.imdb_id" target="_blank">
                <img src="https://logospng.org/download/imdb/imdb-1024.png" class="h-[68px]" />
                Visit IMDb for more details
              </a>
            </div>
            <div
              class="border-t-[1px] border-neutral-500 ml-3 w-[50%] text-blue-500 mt-3 pt-5 text-center"
            >
              <h3 class="text-orange-600 underline font-medium text-[24px] duration-300 hover:text-[26px] animate-bounce">
                <img
                  src="https://www.freeiconspng.com/uploads/orange-click-here-hand-png-8.png"
                  class="h-[38px] mr-2"
                />
                <a :href="'https://hurawatch.store/' + transform(movieDetail.title)" target="_blank"
                  >WATCH NOW!!!
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-[#101f2e] text-white font-bold text-5xl py-3 mt-[57px]">Loading...</div>
</template>
