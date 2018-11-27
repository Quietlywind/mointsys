<template>
  <div class="configure_user" style="padding:10px;">
    <Row :gutter="16">
      <i-col :span="24">
        <Input v-model="userName" placeholder="请输入用户姓名/登录名进行查询" style="width:250px" clearable />
        <Button type="primary" @click="handleSearch">查询</Button>
        <div style="display: inline-block;float:right;margin-bottom:15px;padding-right: 8px;">
          <Button type="primary" @click="adduser">新增用户</Button>
        </div>
      </i-col>
      <i-col :span="24">
        <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="nowData" 
            no-data-text="暂无数据">
        </Table>
        <Page :total="dataCount" 
          :page-size="limit"
          :current.sync="page"
          @on-change="changepage"
          show-total show-elevator
          style="margin-top: 10px;font-size: 14px;text-align: right;">
        </Page>
      </i-col>
    </Row>
    <!-- 新增/修改用户模态框 -->
    <Modal v-model="modalLoading" class-name="user_modal" :width="420">
      <p slot="header" style="font-size:16px;text-align:center">
        <span>{{modaltitle}}</span>
      </p>
      <Form ref="userForm" :model="userForm" :rules="ruleuserForm" :label-width="70">
        <FormItem label="用户姓名" prop="userName">
          <Input v-model="userForm.userName" placeholder="请输入用户姓名" />
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="userForm.phone" placeholder="请输入联系电话" number/>
        </FormItem>
        <FormItem label="职位" prop="position">
          <Select v-model="userForm.position">
              <Option v-for="item in positionData" :value="item.value" :key="item.value" :label="item.label">
                {{item.label}}
              </Option>
          </Select>
        </FormItem>
        <FormItem label="用户状态" prop="status">
            <RadioGroup v-model="userForm.status">
                <Radio label='1'>启用</Radio>
                <Radio label='0'>禁用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="登录名" prop="name" v-if="modaltitle === '新增用户'">
          <Input v-model="userForm.name" placeholder="请输入登录名" />
        </FormItem>
        <template v-else>
          <div class="ivu-form-item ivu-form-item-required">
            <span class="edit_user_status">登录名</span>
            <div class="ivu-form-item-content" style="margin-left: 70px;">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                <div class="edit_user_text">{{userForm.name}}</div>
              </div>
            </div>
          </div>
        </template>
        <FormItem label="登录密码" prop="password" v-if="modaltitle === '新增用户'">
          <Input type="password" v-model="userForm.password" placeholder="请输入登录密码" />
        </FormItem>
        <FormItem label="头像" prop="image">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list="true"
            ref="upload" 
            accept=".jpg,.png,.jpeg"
            :before-upload="uploadbefore"
            :on-success="uploadsuccess"
            :on-progress="uploadprogress">
              <Button icon="ios-cloud-upload-outline" type="primary">上传头像</Button>
          </Upload>
          <div v-if="fileImg !== null">Upload file: {{ fileImg.name }} 
            <img :src='fileImg.name' />
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" :loading="formloading1" @click="submitForm">确定</Button>
      </div>
    </Modal>
    <!-- 用户重置密码模态框 -->
    <Modal v-model="resetLoading" class="reset_modal" :width="420">
      <p slot="header" style="font-size:16px;text-align:center">
        <span>重置密码</span>
      </p>
      <Form ref="resetForm" :model="resetForm" :rules="ruleReset" :label-width="80">
        <FormItem label="登录密码" prop="passwd">
            <Input type="password" v-model="resetForm.passwd" />
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="resetForm.passwdCheck" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelReset">取消</Button>
        <Button type="primary" :loading="formloading2" @click="submitReset">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    const validatePass = (rule,value,callback) =>{
        if(value === ''){
            callback(new Error('请输入登录密码'));
        }else{
            if (this.resetForm.passwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.resetForm.validateField('passwdCheck');
            }
            callback();
        }
    };
    const validatePassCheck = (rule,value,callback) =>{
        if(value === ''){
            callback(new Error('请再一次输入登录密码'));
        }else if(value !== this.resetForm.passwd){
            callback(new Error('两次密码输入不一样'));
        }else{
            callback();
        }
    };
    return {
      fileImg:null,
      resetLoading:false, //用户重置密码模态打开状态
      resetData:{}, //用户重置密码数据
      userName:'', //查询条件用户姓名
      loading:true, //表格加载loading
      modalLoading:false, //用户新增/修改模态打开状态
      formloading1:false, //用户新增/修改提交表单点击确定加载loading
      formloading2:false, //用户重置密码提交表单点击确定加载loading
      inputDisabled:true,  //编辑状态用户登录名置灰
      modaltitle:'新增用户', //初始化modal标题名称
      limit:10,
      page:1,
      dataCount:0,
      tableData:[],
      nowData:[],
      tablecolums1:[
        {title:'登录名',key:'name'},
        {title:'用户姓名',key:'userName'},
        {title:'联系电话',key:'phone'},
        {title:'职位',key:'position'},
        {title:'用户状态', key:'status',
        render:(h,params) =>{
          if(params.row.status === '0'){
            return h('span',{
                    props:{},
                    style:{},
            },'禁用')
          }else if(params.row.status === '1'){
            return h('span',{
                    props:{},
                    style:{},
            },'启用')
          }
        }},
        {title:'操作',key:'action',align:'center',
        render:(h,params)=>{
          if(params.row.position !== '超级管理员'){
            return h('div',[
              h('span',{
                props:{
                  },
                  style:{
                    cursor: 'pointer',
                    // fontWeight:'700',
                    marginRight: '5px',
                    verticalAlign: 'middle',
                    fontSize:'14px'
                  },
                  on:{
                    click:()=>{
                      this.edituser(params.row)
                    }
                }
              },'修改'),
              h('span',{
                props:{
                  },
                  style:{
                    cursor: 'pointer',
                    // fontWeight:'700',
                    marginRight: '5px',
                    verticalAlign: 'middle',
                    fontSize:'14px'
                  },
                  on:{
                    click:()=>{
                      this.deluser(params.row)
                    }
                }
              },'删除'),
              h('span',{
                props:{
                  },
                  style:{
                    cursor: 'pointer',
                    // fontWeight:'700',
                    marginRight: '5px',
                    verticalAlign: 'middle',
                    fontSize:'14px'
                  },
                  on:{
                    click:()=>{
                      this.resetPass(params.row)
                    }
                }
              },'重置密码'),
            ])
          }
        }},
      ],
      positionData:[
        {value:'一般管理员',label:'一般管理员'},
        {value:'职员',label:'职员'}
      ],
      userForm: {
        name:'',
        phone:'',
        position:'',
        status:'1', //账户状态禁用/启用 0/1
        userName:'',
        password:'',
        image:'',
      },
      ruleuserForm: {
        name: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        position:[
          { required: true, message: '请选择用户职位', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        userName:[
          { required: true, message: '请输入用户姓名', trigger: 'blur'}
        ],
        password:[
          { required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
      },
      resetForm:{
          passwd:'',
          passwdCheck:''
      },
      ruleReset:{
          passwd: [
              { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
              { validator: validatePassCheck, trigger: 'blur' }
          ],
      },
    }
  },
  components: {
    // resetForm
  },
  props:{},
  watch:{
    
  },
  computed:{},
  methods:{
    //表格分页事件
    changepage(current){
      this.nowData=[];
      let _start=(current-1)*this.limit;
      let _end=current*this.limit;
      this.nowData=this.tableData.slice(_start,_end);
      this.page=current
    },
    //初始化查询事件
    handleSearch(){
      this.dataCount=0;
      this.page=1;
      this.search();
    },
    //查询事件
    search(){
      this.loading=true;
      let params={
        userName:this.userName,
        page:this.page,
        limit:this.limit
      }
      this.$axios.post('/userData').then((res)=>{
        this.dataCount = res.data.length;
        this.tableData=res.data
        for(let i=0;i<this.limit;i++){
          this.nowData.push(this.tableData[i])
        }
        this.loading=false
      }).catch((err)=>{
        console.log(err)
      })
    },
    adduser(){ //新增用户
      this.modalLoading=true;
      this.formloading1=false;
      this.modaltitle="新增用户";
      this.userForm.name="";
      this.$nextTick(()=>{
        this.$refs.userForm.resetFields();
      })
    },
    edituser(row){ //编辑用户
      this.modalLoading=true;
      this.formloading1=false;
      this.modaltitle="编辑用户";
      this.$refs.userForm.resetFields();
      this.userForm = Object.assign({}, row);
    },
    //新增/编辑用户表单提交事件
    submitForm(){
     this.formloading1=true;
     let params = Object.assign({}, this.userForm);
     this.$refs.userForm.validate((valid) => {
          if (valid) {
            // this.formloading1=true;
          } else {
            this.formloading1=false;
          }
      })
    },
    cancelModal(){ //新增/编辑用户表单取消事件
      this.modalLoading=false;
    },
    deluser(row){ //删除用户
      this.$confirm('是否删除该用户?', '提示', {type: 'warning'}).then(() => {
        this.$message.success({showClose:'true',message: '用户删除成功!',duration:'2000'});
        // this.handleSearch()
      }).catch(() => {
        this.$message.error({showClose:'true',message: '取消删除',duration:'2000'});          
      });
    },
    resetPass(row){ //重置密码模态事件
      this.resetLoading=true;
      this.formloading2=false;
      this.$nextTick(()=>{
        this.$refs.resetForm.resetFields();
      })
      this.resetData=Object.assign({}, row);
    },
    //重置密码表单提交
    submitReset(){
      this.formloading2=true;
      this.$refs.resetForm.validate((valid) => {
          if(valid){
            // setTimeout(() => {
            //   this.formloading2 = true;
            //   this.$nextTick(() => {
            //     this.formloading2 = false;
            //   });
            // }, 2000);
            // this.formloading2=true;
          }else{
            this.formloading2=false;
          }
      })
    },
    cancelReset(){ //用户重置密码表单取消事件
      this.resetLoading=true;
    },
    uploadbefore(file){
      console.log(file)
      this.fileImg=file;
      return false;
    },
    uploadprogress(event,file,fileList){
      
    },
    uploadsuccess(res,file,fileList){
      console.log(res)
      console.log(file)
      console.log(fileList)
    }
  },
  created(){},
  mounted(){
    this.handleSearch()
  }
}
</script>

<style lang="less">
.edit_user_status{
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #515a6e;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
  width: 70px;
}
.user_modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
  }
  .ivu-modal-body{
  padding-bottom: 0px;
  }
}
.edit_user_text{
  display:inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 6px 7px;
  background-color: #fff;
}
</style>
