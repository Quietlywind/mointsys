<template>
  <div style="padding: 10px;" class="remote_operation">
    <Row :gutter="16">
      <Col span="24">
        <Form ref="formInline" :mode="formInline" :rules="ruleInline" inline :label-width="60">
          <FormItem prop="deviceName" :label-width="0">
            <Input v-model="formInline.deviceName" placeholder="输入设备名称/编码"></Input>
          </FormItem>
          <FormItem prop="type" label="设备类型">
            <Select v-model="formInline.type" style="width:162px;">
                <Option v-for="item in deviceTypeData" :value="item.value" :key="item.value" :label="item.name">
                  {{item.name}}
                </Option>
            </Select>
          </FormItem>
          <FormItem prop="status" label="设备状态">
            <Select v-model="formInline.status" style="width:162px;">
                <Option v-for="item in devicestatusData" :value="item.value" :key="item.value" :label="item.name">
                  {{item.name}}
                </Option>
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="search">查询</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="24">
        <!-- <Card> -->
          <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="tableData" 
            @on-row-click="low"
            no-data-text="暂无数据"
            :row-class-name="rowClassName">
          </Table>
        <!-- </Card>   -->
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
// import { operationData } from '@/api/data'
export default {
  data() {
    return {
      formInline:{
        deviceName:'',
        type:'',
        status:'',
        deviceId:'',
      },
      ruleInline:{
      },
      deviceTypeData:[
        {name:'请选择',value:'',},
        {name:'台变',value:'1',},
        {name:'箱变',value:'2',}
      ],
      devicestatusData:[
        {name:'请选择',value:'',},
        {name:'在线',value:'1',},
        {name:'未联网',value:'2',},
        {name:'故障',value:'3',},
        {name:'部分在线',value:'4',},
        {name:'预警',value:'5',}
      ],
      tablecolums1:[
        {title:'设备名称',key:'deviceName',ellipsis:true,tooltip:true},
        {title:'设备编码',key:'deviceId',ellipsis:true,tooltip:true},
        {title:'设备类型', key:'deviceType'},
        {title:'设备地点', key:'deviceAddress',ellipsis:true,tooltip:true},
        {title:'设备状态',key:'deviceStatus'},
        {title:'设备安装时间',key:'deviceTime',sortable:true},
        {title:'备注',key:'notice',ellipsis:true,tooltip:true,}
      ],
      tableData:[],
      loading:true,
      InitSetInterval:null
    }
  },
  components: {},
  props:{},
  watch:{},
  computed:{},
  methods:{
    low(row,index){
      console.log(row)
      console.log(index)
    },
    rowClassName(row,index){
      if(row.deviceStatus === '故障'){
        return 'demo-table-info-gz';
      }else if(row.deviceStatus === '预警'){
        return 'demo-table-info-yj';
      }else if(row.deviceStatus === '未联网'){
        return 'demo-table-info-wlw';
      }else if(row.deviceStatus === '部分在线'){
        return 'demo-table-info-bfzx';
      }else{
        return 'demo-table-info-zx';
      }
    },
    search(){
      this.loading=true;
      let params = Object.assign({}, this.formInline);
        params.deviceId=params.deviceName
      this.$axios.get('/operationData').then((res)=>{
        this.tableData=res.data
        this.loading=false
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  created(){},
  mounted(){
    this.search()
    this.InitSetInterval=setInterval(this.search,15000)
  },
  destroyed(){
    clearInterval(this.InitSetInterval)
  }
}
</script>

<style lang="less">
  // .ivu-table td{
  //   background-color: #182328;
  //   color: #fff;
  // }
  .ivu-table .demo-table-info-gz td{
      color: #D81E06;
  }
  .ivu-table .demo-table-info-yj td{
      color: #F4EA2A;
  }
  .ivu-table .demo-table-info-wlw td{
      color:#FF7F28;
  }
  .ivu-table .demo-table-info-bfzx td{
      color:#168EA6;
  }
  .ivu-table .demo-table-info-zx td{
      color:#000;
  }
</style>
