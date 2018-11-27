<template>
  <div class="order_create_page" style="padding:10px;">
    <Row :gutter="16">
      <i-col :span="24" class="order_create_step">
        <Steps :current="status">
            <Step title="派发工单" :content="startTime"></Step>
            <Step title="待处理" :content="middleTime"></Step>
            <Step title="处理中" :content="endTime"></Step>
            <Step title="已完成" :content="finishTime"></Step>
        </Steps>
      </i-col>
      <i-col :span="24" style="margin-top:20px;">
        <div v-show="status==0">
          <start-form :formdata="data1" @startSubmit="start_form"></start-form>
        </div>
        <div v-show="status==1">
          <middle-form :formdata="data2" @middleSubmit="middle_form"></middle-form>
        </div>
        <div v-show="status==2">
          <finish-form :formdata="data3" @finishSubmit="finish_form"></finish-form>
        </div>
        <div v-show="status==3">
          <end-form :formdata="data4" @endSubmit="end_form"></end-form>
        </div>
      </i-col>
      <i-col :span="24" style="margin-top:15px;text-align:right;">
        <template v-if="status==0">
          <Button type="primary" @click="addCurrent">下一步</Button>
        </template>
        <template v-if="status==1">
          <Button type="primary" @click="addCurrent">下一步</Button>
        </template>
        <template v-if="status==2">
          <Button type="primary" @click="addCurrent">下一步</Button>
        </template>
        <template v-if="status==3">
          <Button type="primary" @click="addCurrent">下一步</Button>
        </template>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import StartForm from '@comp/order_form/start_form'
import MiddleForm from '@comp/order_form/middle_form'
import FinishForm from '@comp/order_form/finish_form'
import EndForm from '@comp/order_form/end_form'
import {getDate} from '@/libs/tools'
export default {
  name:'order_create',
  data() {
    return {
      status:0, //默认状态
      startTime:'', //开始时间
      middleTime:'', //处理中时间
      endTime:'',  //完成时间
      finishTime:'', //归档时间
      data1:[],
      data2:[],
      data3:[],
      data4:[],
    }
  },
  components: {
    StartForm,
    MiddleForm,
    FinishForm,
    EndForm
  },
  props:{
  },
  watch:{
    //监听步骤变化
    status(val){
      if(val === 4){
        this.status=0
      }
    }
  },
  computed:{},
  methods:{
    addCurrent(){
      this.status +=1;
    },
    //子组件开始表单提交事件
    start_form(item){
      console.log(item)
    },
    //子组件处理中表单提交事件
    middle_form(item){
      console.log(item)
    },
    //子组件已完成表单提交事件
    end_form(item){
      console.log(item)
    },
    //子组件已归档表单提交事件
    finish_form(){

    }
  },
  created(){},
  mounted(){
    //通过路由传参拿到当前工单状态节点，是否为创建工单还是查看工单
    if(this.$route.query.status === 0){
      this.status=Number(this.$route.query.status)
      this.startTime=getDate(new Date(),'year')
    }else{
      this.status=Number(this.$route.query.status)
      this.centerTime=getDate(new Date(),'year')
    }
  }
}
</script>
<style lang="less">
@size:14px;
.order_create_page{
    .order_create_step{
        .ivu-steps .ivu-steps-content{
            font-size:@size;
        }
        .ivu-steps .ivu-steps-title{
            font-size: 15px;
        }
    }
}
</style>


