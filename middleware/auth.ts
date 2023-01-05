export default defineNuxtRouteMiddleware((to) => {
    // const user = useSupabaseUser()
    if (to.path ==='/profile'){
        navigateTo('/login')
    }
})