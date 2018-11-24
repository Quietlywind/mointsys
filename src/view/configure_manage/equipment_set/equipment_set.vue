<template>
  <div class="configure_equipment" style="padding:10px;">
    <Row :gutter="16">
      <i-col :span="24">
        <div style="text-align:right;margin-bottom:15px;padding-right: 8px;">
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
      :loading="fomrloading"
      class-name="equipment_modal">
      <p slot="header" style="font-size:16px;text-align:center">
        <span>{{modaltitle}}</span>
      </p>
      <Form ref="formDe" :mode="formDe" :rules="ruleForm" :label-width="96">
        <FormItem prop="id" label="设备编码">
            <Input v-model="formDe.id" placeholder="请输入设备编码" />
        </FormItem>
        <FormItem prop="name" label="设备名称">
            <Input v-model="formDe.name" placeholder="请输入设备名称" />
        </FormItem>
        <FormItem prop="type" label="设备类型">
          <Select v-model="formDe.DeviceData">
              <Option v-for="item in DeviceData" :value="item.value" :key="item.value" :label="item.label">
                {{item.label}}
              </Option>
          </Select>
        </FormItem>
        <FormItem prop="lng" label="设备经度">
            <Input v-model="formDe.lng" placeholder="请输入设备经度" />
        </FormItem>
        <FormItem prop="lat" label="设备纬度">
            <Input v-model="formDe.lat" placeholder="请输入设备纬度" />
        </FormItem>
        <FormItem prop="lat" label="设备安装地点">
            <Input v-model="formDe.place" placeholder="请输入设备纬度" />
        </FormItem>
        <FormItem prop="time" label="设备安装时间">
            <DatePicker type="datetime" style="width:100%" format="yyyy-MM-dd HH:mm" 
            placeholder="选择日期时间" v-model="formDe.time"></DatePicker>
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
      modalLoading:false, //设备新增/修改模态打开loading
      fomrloading:true,
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
      formDe:{
        id:'',
        name:'',
        type:'',
        lng:'',
        lat:'',
        place:'',
        time:''
      },
      ruleForm:{

      },
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
        page:this.page,
        limit:this.limit
      }
      this.$axios.get('/equipmentData').then((res)=>{
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
      this.formDe = Object.assign({}, row);
      console.log(this.formDe)
    },
    //表格新增设备事件
    adddevice(){
      this.modalLoading=true;
    },
    //表格禁用启用设备事件
    switchDeal(row){
      console.log(row)
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
</style>
