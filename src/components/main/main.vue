<template>
  <Layout style="height:100%" class="main">
    <Header>
      <div class="logo-con">
        <!-- style="padding-left:8px;" -->
        <img src="../../assets/logo.png">
        <!-- <a href="/"></a> -->
      </div>
      <div class="logo-title">
        <span style="font-size: 16px;color: #fff;font-weight:700;">台账在线监测平台</span>
      </div>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <sider-trigger :collapsed="collapsed" @on-coll-change="handleCollapsedChange"></sider-trigger>
      </Sider>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side_menu'
import HeaderBar from './components/header_bar'
import SiderTrigger from './components/sider_trigger'
import TagsNav from './components/tags_nav'
import User from './components/user'
import routers from '@/router/routers'
import {mapMutations,mapActions,mapGetters} from 'vuex'
import {getNavTagList,getNextRoute,routeEqual} from '@/libs/util'
export default {
  name:'Main',
  components:{
      SideMenu,
      HeaderBar,
      SiderTrigger,
      TagsNav,
      User
  },
  props:{},
  data(){
    return {
      collapsed:false
    }
  },
  watch:{},
  computed:{
    tagNavList (){
      return this.$store.state.app.tagNavList
    },
    tagRouter (){
      return this.$store.stata.app.tagRouter
    },
    menuList (){
      return this.$store.getters.menuList
    },
    // local (){
    //   return this.$store.state.app.local
    // },
    hasReadErrorPage(){
      return this.$store.state.app.hasReadErrorPage
    },
    // unreadCount(){
    //   return this.$store.state.user.unreaderCount
    // }
  },
  methods:{
    ...mapMutations([
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    turnToPage(route){
      let {name,params,query} = {}
      if(typeof route === 'string') name = route
      else{
        name=route.name;
        params=route.params;
        query=route.query;
      }
      if(name.indexOf('isTurnByHref_') > -1){
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    //收缩侧边栏子组件事件
    handleCollapsedChange(state){
      this.collapsed = state
    },
    //关闭主区域下拉标签页事件
    handleCloseTag(res,type,route){
      if(type === 'all'){
        this.turnToPage(this.$config.homeName)
      }else if(routeEqual(this.$route,route)){
        if(type !== 'others'){
          const nextRoute = getNextRoute(this.tagNavList,route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick(item){
      this.turnToPage(item)
    }
  },
  created(){},
  mounted(){
    /**
     * @description 初始化设置标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    this.addTag({
      route:this.$store.state.app.homeName
    })
    //如果当前打开页面不存在标签栏中，则跳转到homeName页
    if(!this.tagNavList.find(item =>item.name === this.$route.name)){
      this.$router.push({
        name:this.$config.homeName
      })
    }
  }
}
</script>
<style lang="less">
  @import './main.less';
</style>