import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_vue')

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/jeeweb-vue-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      },
      {
        path: 'info',
        component: () => import('@/views/sys/user/info'),
        name: 'userInfo',
        hidden: true,
        meta: { title: '用户信息', icon: 'dashboard', noCache: true }
      },
      {
        path: 'change/password',
        component: () => import('@/views/sys/user/changePassword'),
        name: 'changePassword',
        hidden: true,
        meta: { title: '修改密码', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 处理路由信息
 *
 * @param routerMap
 */
export function processRouter(routerMap) {
  const newRouters = routerMap.filter(router => {
    const component = router.component
    try {
      router.name = router.path
      if (component) {
        if (component === 'Layout') {
          router.component = Layout
        } else {
          router.component = _import(component)
        }
      } else {
        router.component = undefined
      }
    } catch (e) {
      router.component = () => import('@/views/errorPage/404')
    }
    if (router.children && router.children.length) {
      router.children = processRouter(router.children)
    }
    return true
  })
  return newRouters
}
