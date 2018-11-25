<template>
  <div class="power_notcie">
    <Row :gutter="16">
      <i-col :span="24">
        <Card>
          <Row>
            <span style="float:left;line-height: 32px;">公告标题：</span>
            <i-col :span="20">
              <Input size="default" v-model="notice_titile" suffix="md-list-box" placeholder="请输入公告标题" />
            </i-col>
          </Row>
        </Card>
      </i-col>
      <i-col :span="24" style="margin-top:15px;text-align: right;padding-right:20px;">
        <Button type="primary" >保存</Button>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      notice_titile:'',
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>

<style scoped>
.power_notcie{
  
}
</style>
