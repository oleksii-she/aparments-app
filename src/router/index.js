import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'

import { useAuthStore } from '../stores/useStores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/apartments',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/registrationPage.vue'),
      meta: { hideForAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/loginPage.vue'),
      meta: { hideForAuth: true }
    },

    {
      path: '/post-new-add',

      component: () => import('../pages/newPostPage.vue'),
      name: 'post-new-add'
    },
    {
      path: '/:pathMatch(.*)*',

      component: () => import('../pages/ErrorPage.vue'),
      name: 'error-page'
    },

    {
      path: '/apartments/review/:id',

      component: () => import('../pages/ReviewPage.vue'),
      name: 'review-page'
    },
    {
      path: '/myaccount/',

      component: () => import('../pages/UserPage.vue'),
      name: 'user-page',
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuth } = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (isAuth) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
