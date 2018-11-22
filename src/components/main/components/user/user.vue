<template>
  <div class="user-dropdown">
    <Dropdown @on-click="handleClick">
      <Icon type="ios-contact-outline" :size="26"/>
      <span>个人中心</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="editpass">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props:{
    // userAvator:{
    //   type:String,
    //   default:''
    // },
    // messageUnreadCount: {
    //   type: Number,
    //   default: 0
    // }
  },
  data() {
    return {

    }
  },
  components: {

  },
  
  watch:{},
  computed:{},
  methods:{
    ...mapActions([
      'handleLogOut'
    ]),
    logout(){
      this.handleLogOut().then(()=>{
        this.$router.push({
          name: 'login'
        })
      })
    },
    editPass(){
      console.log("修改密码")
    },
    handleClick(name){
      switch(name){
        case 'logout':this.logout()
        break;
        case 'editpass':this.editPass()
        break;
      }
    }
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
.page{}
</style>

