import Main from '@/components/main'

Vue.use(Router)

let router= new Router({
  mode:'history',
  base:'',
  routes: [
    {
        path:'/login',
        name:'login',
        meta
    },  
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
export default router