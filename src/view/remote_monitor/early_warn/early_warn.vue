<template>
  <div class="remote_early_warn" style="padding: 10px;">
    <Row :gutter="16">
      <i-col span="24">
        <Form ref="formInline" :mode="formInline" :rules="ruleInline" inline :label-width="60">
          <FormItem prop="deviceName" :label-width="0">
              <Input v-model="formInline.deviceName" placeholder="输入设备名称"></Input>
          </FormItem>
          <FormItem prop="earlyTime" label="日期">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间" v-model="formInline.earlyTime"></DatePicker>
          </FormItem>
          <FormItem prop="status" label="预警状态">
            <Select v-model="formInline.status" style="width:162px;">
                <Option v-for="item in StatusData" :value="item.value" :key="item.value" :label="item.label">
                  {{item.label}}
                </Option>
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="hanldeSearch">查询</Button>
          </FormItem>
        </Form>
      </i-col>  
      <i-col span="24" >
        <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="nowData" 
            no-data-text="暂无数据">
        </Table>
        <Page :total="dataCount" 
          :page-size="limit"
          :current.sync="page"
          @on-change="changepage"
          show-total show-sizer show-elevator
          style="margin-top: 10px;font-size: 14px;text-align: right;">
        </Page>
      </i-col>    
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      formInline:{
        deviceName:'',
        earlyTime:'',
        status:''
      },
      ruleInline:{},
      loading:true,
      limit:10,
      page:1,
      dataCount:0,
      tableData:[],
      nowData:[],
      tablecolums1:[
        {title:'设备名称',key:'deviceName'},
        {title:'预警时间',key:'earlyTime',ellipsis:true,tooltip:true,sortable:true},
        {title:'预警内容', key:'earlyContent',ellipsis:true,tooltip:true},
        {title:'预警状态', key:'earlyStatus'},
        {title:'恢复时间',key:'recoveryTime',sortable:true},
        {title:'现场是否处理',key:'handle'},
        {title:'处理人员',key:'handlePerson'},
        {title:'操作时间',key:'operationTime',sortable:true},
        {title:'操作',key:'operation',width: 150,align: 'center',
          render:(h,params) =>{
            if(params.row.earlyStatus ==='报警'){
                return h('div',[
                  h('a',{
                    props:{
                      type:'primary',
                      size:'small'
                    },
                    style:{
                      cursor: 'pointer',
                      fontWeight:'700'
                    },
                    on:{
                      click:()=>{
                        this.showWorkList(params.row)
                      }
                    }
                  },'派发工单')
                ])
            }else if(params.row.earlyStatus ==='报警解除'){
                return h('div',[
                  h('a',{
                    props:{},
                    style:{
                      fontWeight:'700'
                    },
                  },'已派发')
                ])
            }
          }
        }
      ],
      StatusData:[
        {value:'',label:'请选择'},
        {value:'1',label:'报警'},
        {value:'2',label:'警报解除'},
      ],
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    //查询按钮事件
    hanldeSearch(){
      this.dataCount=0;
      this.page=1;
      this.search();
    },
    //表格分页事件
    changepage(current){
      this.nowData=[];
      let _start=(current-1)*this.limit;
      let _end=current*this.limit;
      this.nowData=this.tableData.slice(_start,_end);
      this.page=current
    },
    //初始化查询事件
    search(){
      this.loading=true;
      let params = Object.assign({}, this.formInline);
      params.page=this.page;
      params.limit=this.limit;
      this.$axios.get('/earlyDate').then((res)=>{
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
    //派发工单事件
    showWorkList(row){
      const route={
        name:'order_create',
        query:{
          id:row.id,
          name:row.handlePerson,
          status:0,
        },
        meta:{
          title:`参数-${row.id}`
        }
      }
      this.$router.push(route)
    },
  },
  created(){},
  mounted(){
    this.hanldeSearch()
  }
}
</script>

<style scoped>
.remote_early_warn{}
</style>
