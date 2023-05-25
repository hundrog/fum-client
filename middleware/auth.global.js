export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/login' && useCookie('token').value === undefined) {
    return navigateTo('/login')
  }
  if (to.path === '/login' && useCookie('token').value !== undefined){
    return navigateTo('/')
  }
})