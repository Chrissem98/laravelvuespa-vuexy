import { useAuthStore } from '@/stores/auth'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach(async to => {

  const auth = useAuthStore()

  if(!auth.loggedIn){
    await auth.getAuthUser()
  }

  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (!to.meta.requiresGuest && !auth.user) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: "login",

      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
  if (auth.user && to.meta.requiresGuest) {
    return {
      name: "index",
    }
  }
})


// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
export default router
