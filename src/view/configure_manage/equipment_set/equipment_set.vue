<template>
  <div class="configure_equipment" style="padding:10px;">
    <Row :gutter="16">
      <i-col :span="24">
        <Input v-model="deviceName" placeholder="请输入设备名称/编码/地点进行查询" style="width:250px" clearable />
        <Button type="primary" @click="handleSearch">查询</Button>
        <div style="display: inline-block;float:right;margin-bottom:15px;padding-right: 8px;">
          <Button type="primary" @click="adddevice">新增设备</Button>
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
    <!-- 新增/修改设备模态框 -->
    <Modal 
      v-model="modalLoading"
      :loading="formloading"
      class-name="equipment_modal"
      @on-ok="submitForm">
      <p slot="header" style="font-size:16px;text-align:center">
        <span>{{modaltitle}}</span>
      </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96">
        <FormItem label="设备编码" prop="id">
            <Input v-model="formValidate.id" ref="one" :disabled="inputDis" placeholder="请输入设备编码" />
        </FormItem>
        <FormItem label="设备名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入设备名称" />
        </FormItem>
        <FormItem label="设备类型" prop="type">
          <Select v-model="formValidate.type">
              <Option v-for="item in DeviceData" :value="item.value" :key="item.value" :label="item.label">
                {{item.label}}
              </Option>
          </Select>
        </FormItem>
        <FormItem label="设备经度" prop="lng">
            <Input v-model="formValidate.lng" placeholder="请输入设备经度" />
        </FormItem>
        <FormItem label="设备纬度" prop="lat">
            <Input v-model="formValidate.lat" placeholder="请输入设备纬度" />
        </FormItem>
        <FormItem label="设备安装地点" prop="place">
            <Input v-model="formValidate.place" placeholder="请输入设备纬度" />
        </FormItem>
        <FormItem label="设备安装时间" prop="time">
            <DatePicker type="datetime" style="width:100%" format="yyyy-MM-dd HH:mm" 
            placeholder="选择日期时间" v-model="formValidate.time"></DatePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'equipment',
  data() {
    return {
      loading:true, //表格加载loading
      modalLoading:false, //设备新增/修改模态打开状态
      formloading:true,
      inputDis:true,  //编辑状态设备编码置灰
      deviceName:'', //设备管理查询条件
      modaltitle:'新增设备',
      limit:10,
      page:1,
      dataCount:0,
      tableData:[],
      nowData:[],
      tablecolums1:[
        {title:'序号',type:'index',width:60,align:'center',},
        {title:'设备名称',key:'name'},
        {title:'设备编码',key:'id',ellipsis:true,tooltip:true,sortable:true},
        {title:'设备类型',key:'type'},
        {title:'设备地点', key:'place',ellipsis:true,tooltip:true},
        {title:'设备安装时间', key:'time',sortable:true},
        {title:'经度',key:'lng',sortable:true},
        {title:'纬度',key:'lat'},
        {title:'操作',key:'action',align:'center',width:150,
          render:(h,params) =>{
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
                      this.editdevice(params.row)
                    }
                  }
                },'修改'),
                h('i-switch', { //数据库1是已处理，0是未处理
                props: {
                  size:'large',
                  value: params.row.status === 1  //控制开关的打开或关闭状态，官网文档属性是value
                },
                slot:{
                  open:'启用',
                  close:'禁用'
                },
                style: {},
                on: {
                  'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                    this.switchDeal(value) //params.index是拿到table的行序列，可以取到对应的表格值
                  }
                }
              },
              [h('span', {                                       
                  slot: 'open',                                   
                  domProps: {                                     
                    innerHTML: '启用'                               
                  }                                               
                }),                                               
                h('span', {                                       
                  slot: 'close',                                  
                  domProps: {                                     
                    innerHTML: '禁用'                               
                  }                                               
                })])
            ],)
          }
        },
      ],
      DeviceData:[
        {value:'',label:'请选择'},
        {value:'台变',label:'台变'},
        {value:'箱变',label:'箱变'},
      ],
      formValidate:{
        id:'',
        name:'',
        type:'',
        lng:'',
        lat:'',
        place:'',
        time:''
      },
      ruleValidate:{
        // id: [
        //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        // ],
        // name: [
        //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
        // ],
      }
    }
  },
  components: {

  },
  props:{},
  watch:{},
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
        deviceName:this.deviceName,
        page:this.page,
        limit:this.limit
      }
      this.$axios.post('/equipmentData').then((res)=>{
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
    //表格修改设备事件
    editdevice(row){
      this.modalLoading=true;
      this.inputDis=true;
      this.modaltitle="修改设备";
      this.$refs.formValidate.resetFields();
      this.formValidate = Object.assign({}, row);
      console.log(this.formValidate)
    },
    //表格新增设备事件
    adddevice(){
      this.modalLoading=true;
      this.inputDis=false;
      this.modaltitle="新增设备"
      this.$nextTick(function() {
        this.$refs.formValidate.resetFields();
      })
    },
    //表格禁用/启用设备事件
    switchDeal(flag){
      if(flag){
        this.$message.success({showClose: true, message: '启用设备成功', duration: 1500});
      }else{
        this.$message.error({showClose: true, message: '禁用设备成功', duration: 1500});
      }
    },
    //表单提交事件
    submitForm(){
      this.modalLoading=false;
      console.log(this.formValidate)
    },
  },
  created(){},
  mounted(){
    this.handleSearch()  
  }
}
</script>

<style lang="less">
.equipment_modal .ivu-form .ivu-form-item-label{
  font-size:14px;
}
// .equipment_modal{
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   .ivu-modal{
//     top: 0;
//   }
// }
</style>
