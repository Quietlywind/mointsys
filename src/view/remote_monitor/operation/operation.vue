<template>
  <div style="padding: 18px;">
    <Row :gutter="16">
      <Col span="24">
        <Form ref="formInline" :mode="formInline" :rules="ruleInline" inline :label-width="60">
          <FormItem prop="device" :label-width="0">
            <Input v-model="formInline.device" placeholder="输入设备名称/编码"></Input>
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
            <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="24">
        <Card>
          <Table border>
          </Table>
        </Card>  
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import { operationData } from '@/api/data'
export default {
  data() {
    return {
      formInline:{
        device:'',
        type:'',
        status:'',
      },
      ruleInline:{
      },
      deviceTypeData:[{
        name:'请选择',
        value:'',
      },{
        name:'台变',
        value:'1',
      },{
        name:'箱变',
        value:'2',
      }],
      devicestatusData:[{
        name:'请选择',
        value:'',
      },{
        name:'在线',
        value:'1',
      },{
        name:'未联网',
        value:'2',
      },{
        name:'故障',
        value:'3',
      },{
        name:'部分在线',
        value:'4',
      },{
        name:'预警',
        value:'5',
      }],
      tablecolums1:[
        {title:'设备名称',key:'deviceName'},
        {title:'设备编码',key:'deviceId'},
        {title:'设备类型', key:'deviceType'},
        {title:'设备地点', key:'deviceAddress'},
        {title:'设备状态',key:'deviceStatus'},
        {title:'设备安装时间',key:'deviceTime'},
        {title:'备注',key:'notice'}
      ],
      tableData:[{
        deviceName:'九变电#21',
        deviceId:'123123232121aa',
        deviceType:'台变',
        deviceAddress:'东门大道东1',
        deviceStatus:'',
        deviceTime:'',
        notice:'',
      }]
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){
    operationData().then(res=>{
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>

</style>
