import Vue from 'vue'
import Router from 'vue-router'
// import { ObigoRouter } from 'obigo-js-ui'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new VueRouter({
  mode: 'abstract',
  routes
})
router.push({ name: 'WelcomeCard' })

export default router
