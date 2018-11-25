<template>
  <div class="order_create_page">
    <Row :gutter="16">
      <i-col :span="24">
        <Steps :current="status" direction="horizontal">
            <Step title="开始" :content="startTime"></Step>
            <Step title="处理中" :content="centerTime"></Step>
            <Step title="已完成" :content="finishTime"></Step>
            <Step title="已归档" :content="fileTime"></Step>
        </Steps>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'order_create',
  data() {
    return {
      status:0,
      startTime:'',
      centerTime:'',
      finishTime:'',
      fileTime:'',
    }
  },
  components: {

  },
  props:{
  },
  watch:{
    status(val){
      console.log(val)
    }
  },
  computed:{},
  methods:{
    addCurrent(){
      this.status +=1;
    }
  },
  created(){},
  mounted(){
    this.status=this.$route.query.status
    this.startTime=new Date()
  }
}
</script>

<style scoped>
.order_create_page{}
</style>
