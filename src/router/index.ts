import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getApplicationName } from '@/shared/get-app-name'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) => {
    if (to.hash)
      return {
        behavior: 'smooth',
        el: to.hash,
      }

    return { left: 0, top: 0 }
  },
  routes,
})

const appName = getApplicationName()
router.beforeEach((to, _, next) => {
  document.title = to?.meta?.pageTitle ? `${to.meta.pageTitle} - ${appName}` : appName

  return next()
})

export default router
