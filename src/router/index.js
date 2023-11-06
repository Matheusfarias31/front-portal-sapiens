import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import plurimas from '../views/plurimas/plurimas.vue'
import logout from '../views/logout.vue';
import config from '@/config/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/portalplurimas/login',
    name: 'login',
    component: login
  },
  {
    path: '/portalplurimas/plurimas',
    name: 'plurimas',
    component: plurimas,
    beforeEnter: config.auth
  },
  {
    path: '/portalplurimas/logout',
    name: 'logout',
    component: logout
  },
  { path: "*", redirect: '/portalplurimas/logout' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
