import Vue from 'vue'
import VueRouter from 'vue-router'

import Contact from '../components/Contact.vue'
import Portfolio from '../components/Portfolio.vue'
import LegalNotice from '../components/LegalNotice.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/contact', component: Contact },
  { path: '/portolio', component: Portfolio },
  { path: '/legalnotice', component: LegalNotice },
  { path: '/', component: Home }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

export default router
