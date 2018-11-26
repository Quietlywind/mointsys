<template>
  <div class="order_start_form">
        <Form ref="startForm" :mode="startForm" inline :rules="ruleStart" label-position="top">
            <Row :gutter="16">
                <i-col :span="4">
                    <FormItem prop="id" label="工单编号" style="width:100%;">
                    <Input v-model="startForm.id" placeholder="" />
                    </FormItem>
                </i-col>
                <i-col :span="4">
                    <FormItem prop="time" label="派工日期" style="width:100%;">
                        <DatePicker v-model="startForm.time" type="datetime" style="width:100%;" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间"></DatePicker>
                    </FormItem>
                </i-col>
                <i-col :span="4">
                    <FormItem prop="place" label="故障地址" style="width:100%;">
                    <Input v-model="startForm.place" placeholder="" />
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col :span="24">
                    <FormItem prop="context" label="故障内容" style="width:100%;">
                        <Input v-model="startForm.context" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="请输入故障内容" />
                    </FormItem>
                </i-col>
            </Row>
        </Form>
        <Row>
            <i-col :span="24" style="text-align: right;padding-right:20px;">
                <Button type="primary" @click="startSubmit">保存</Button>
            </i-col>
        </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDate} from '@/libs/tools'
export default {
  data() {
    return {
      //开始工单form
      startForm:{
        id:'',
        time:'',
        place:'',
        context:'',
      },
      //开始工单form的验证
      ruleStart:{}
    }
  },
  components: {

  },
  props:{
      formdata:{
        type:Array,
        default (){
          return []
        }
      }
  },
  watch:{},
  computed:{},
  methods:{
      startSubmit(){
          let params=Object.assign({}, this.startForm);
          params.time=getDate(params.time,'year')
          this.$emit('startSubmit',params)
      }
  },
  created(){},
  mounted(){
      if(this.formdata.length > 0){
          console.log('不是新建工单')
      }else{
          this.startForm={
            id:getDate(new Date(),'id'),
            time:getDate(new Date(),'year')
          }
          console.log('是新建工单')
      }
  }
}
</script>

<style lang="less">
    .order_start_form{

    }
</style>
