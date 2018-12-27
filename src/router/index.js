import Vue from 'vue/dist/vue.js';
import Router from 'vue-router'
import Login from '@/components/login/login' // @ 是 src 路径的别名，webpack 配置的
import Home from '@/components/home/home'
import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'


Vue.use(Router)
// 配置路由及组件
const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 1. 配置子路由在父"组件"中添加<router-view></router-view> 出口标记
      // 2. 然后父路由中通过 children 来声明路由
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        },
      ]
    
    }
  ]
})
// 1. 添加路由拦截器,看是携带 token 令牌,否则去登录
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    // 检查 token 令牌;有放行,没有跳转登录页面
    const token = window.localStorage.getItem('admin-token')
    if (!token) {
      next({
        name:'login'
      })
    } else {
      next()
    }
  }
})
// 2. 导出路由
export default router
