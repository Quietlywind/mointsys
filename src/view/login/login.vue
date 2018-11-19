<template>
  <div class="login">
    <div class="login-con">
      <Card title="欢迎登录" :bordered="true">
        <div class="form-con">
          <Form ref="loginForm" :model="loginForm" :rules="ruleForm" @keydown.enter.native="handleSubmit">
            <FormItem prop="userName">
              <Input type="text" v-model="loginForm.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit">登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  components:{},
  props:{},
  data(){
    return {
      loginForm:{
        userName:'super_admin',
        password:'',
      },
      ruleForm:{
        userName:[
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleSubmit(){
      this.$ref.loginForm.validate((valid) =>{
        if(valid){

        }
      })
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less">
  @import './login.less';
</style>