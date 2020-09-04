import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

import Nprogress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: () => import('@/views/EventList.vue'),
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: () => import('@/views/EventShow.vue'),
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(event => {
          to.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == '404') {
            next({
              name: '404',
              params: { resource: 'event' }
            })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/create',
    name: 'event-create',
    component: () => import('@/views/EventCreate.vue')
  },
  {
    path: '/example',
    name: 'example',
    component: () => import('@/views/Example.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound.vue'),
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () => import('@/views/NetworkIssue')
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: { resource: 'page' }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
