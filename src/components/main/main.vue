<template>
  <Layout style="height:100%" class="main">
    <Header>台账在线监测平台</Header>
    <Layout>
      <Sider hide-trigger>Sider</Sider>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side_menu'
import HeaderBar from './components/header_bar'
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
      
    }
  },
  methods:{},
  created(){},
  mounted(){
    
  }
}
</script>
<style lang="less">
  @import './main.less';
</style>