<template>
  <div style="padding: 18px;">
    <Row :gutter="16">
      <Col span="24" />
        <Form ref="formInline" :mode="formInline" :rules="ruleInline" inline :label-width="60">
          <FormItem prop="deviceName" :label-width="0">
              <Input v-model="formInline.deviceName" placeholder="输入设备名称/编码"></Input>
          </FormItem>
          <FormItem prop="type" label="视频类型">
            <Select v-model="formInline.type" style="width:162px;">
                <Option v-for="item in devicestatusData" :value="item.value" :key="item.value" :label="item.name">
                  {{item.name}}
                </Option>
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="search">查询</Button>
          </FormItem>
        </Form>
      <Col span="24" />
        <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="tableData" 
            no-data-text="暂无数据">
        </Table>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      formInline:{
        deviceName:'',
        type:''
      },
      ruleInline:{

      },
      devicestatusData:[
        {name:'请选择',value:'',},
        {name:'在线',value:'1',},
        {name:'未联网',value:'2',},
        {name:'故障',value:'3',},
        {name:'部分在线',value:'4',},
        {name:'预警',value:'5',}
      ],
      tablecolums1:[
        {title:'视频名称',key:'deviceName'},
        {title:'视频编码',key:'deviceId',ellipsis:true,tooltip:true},
        {title:'视频安装地点', key:'deviceAddress',ellipsis:true,tooltip:true},
        {title:'视频状态', key:'deviceStatus'},
        {title:'设备安装时间',key:'deviceTime',sortable:true},
        {title:'操作',key:'operation'}
      ],
      tableData:[],
      loading:true,
      InitSetInterval:null
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    search(){
      this.loading=true;
      let params = Object.assign({}, this.formInline);
      console.log(params)
      this.$axios.get('/videoData').then((res)=>{
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
  }
}
</script>

<style scoped>
.page{}
</style>
