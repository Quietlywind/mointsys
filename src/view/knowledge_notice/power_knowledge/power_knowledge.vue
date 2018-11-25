<template>
  <div class="power_knowledge">
    <Row :gutter="16">
      <i-col :span="24">
        <Card>
          <Row>
            <span style="float:left;line-height: 32px;">知识标题：</span>
            <i-col :span="20">
              <Input size="default" v-model="knowledge_titile" suffix="md-list-box" placeholder="请输入知识标题" />
            </i-col>
          </Row>
        </Card>
      </i-col>
      <i-col :span="24" style="margin-top:15px;text-align: right;padding-right:20px;">
        <Button type="primary" >保存</Button>
      </i-col>
    </Row>
    <!-- <i-editor v-model="content" :write-name="title">

    </i-editor>
    {{content}} -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      content:'',
      knowledge_titile:'',
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
.power_knowledge{

}
</style>
