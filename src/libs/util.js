import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import {forEach,hasOneOf,objEqual} from '@/libs/tools'
export const TOKEN_KEY = 'token'

// 设置token
export const setToken = (token) =>{
    Cookies.set(TOKEN_KEY,token,{expires:config.cookieExpires || 7})
}

// 获取token
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

// 判断是否有孩子节点
export const hasChild = (item) =>{
  return item.children && item.children.length !==0
}

//
export const showThisMenuEle = (item,access) =>{
  if(item.meta && item.meta.access && item.meta.access.length){
    if(hasOneOf(item.meta.access,access)) return true
    else return false
  }else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list,access) =>{
  let res=[];
  forEach(list,item => {
    if(!item.meta || (item.meta && !item.meta.hideInMenu)){
      let obj={
        icon: (item.meta && item.meta.icon) || "",
        name: item.name,
        meta: item.meta
      }
      if((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item,access)){
        obj.children=getMenuByRouter(item.children,access)
      }
      if(item.meta && item.meta.href) obj.href = item.meta.href
      if(showThisMenuEle(item,access)) res.push(obj)
    }
  })
  return res
}

export const getRouteTitleHandled = (route) =>{
  let router = {...route}
  let meta = {...route.meta}
  let title = ''
  if(meta.title){
    if(typeof meta.title === 'function'){
      meta.__titleIsFunction__ = true
      title=meta.title(router)
    }else title=meta.title
  }
  meta.title=title
  router.meta=meta
  return router
}

export const showTitle = (item,vm) =>{
  let {title, __titleIsFunction__ } = item.meta
  if(!title) return
  if(vm.$config.useI18n){
    if (title.includes('{{') && title.includes('}}') && vm.$config.useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
    else if (__titleIsFunction__) title = item.meta.title
    else title = vm.$t(item.name)
  }else title = (item.meta && item.meta.title) || item.name
  return title
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = ()=>{
  const list =localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list,newRoute) => {
  const {name,path,meta} = newRoute
  let newList = [...list]
  if(newList.findIndex(item => item.name ===name) >= 0) return newList
  else newList.push({name,path,meta})
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
    console.log(route.meta)
    if (route.meta && route.meta.access){
      return hasOneOf(access, route.meta.access)
    }else{
      return true
    }
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
    const routePermissionJudge = (list) => {
      return list.some(item => {
        if (item.children && item.children.length) {
          return routePermissionJudge(item.children)
        } else if (item.name === name) {
          return hasAccess(access, item)
        }
      })
    }
    return routePermissionJudge(routes)
  }

  /**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url =>{
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数 用于mock数据
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times,callback) =>{
  let i= -1;
  while(++i < times){
    callback(i)
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const showByAccess = (access,canViewAccess) =>{
  return hasOneOf(canViewAccess,access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1,route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1,params2) && objEqual(query1,query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNaveList,routeItem) => {
  let len=tagNaveList.length
  let res =false
  doCustomTimes(len,(index)=>{
    if(routeEqual(tagNaveList[index],routeItem)) res =true
  })
  return res
}

export const localSave = (key,value) =>{
  localStorage.setItem(key,value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}


