// import BannerMovie from '../components/BannerMovie.vue'
import LandingPage from '../components/LandingPage.vue'
import MovieDetail from '../components/MovieDetail.vue'
import MovieList from '../components/MovieList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/movies/:id',
      name: 'Movie Detail',
      component: MovieDetail
    },
    {
      path: '/movies/search',
      name: 'MovieList',
      component: MovieList,
      props: (route) => {
        const params = route.query.params ? JSON.parse(route.query.params) : {}
        return {
          movies: params.movies || [],
          searched: params.searched || ''
        }
      }
    }
  ]
})

export default router
