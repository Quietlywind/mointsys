<template>
  <a href="javascript:;" @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon :type="icon" :size="size" />
  </a>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'siderTrigger',
  data() {
    return {

    }
  },
  components: {

  },
  props:{
    collapsed: Boolean,
    icon:{
      type:String,
      default:'navicon-round'
    },
    size:{
      type:Number,
      default:26
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleChange(state){
      this.$emit('on-coll-change',!this.collapsed)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less">
@import './sider_trigger.less';
</style>
