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
  props:{},
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>

<style scoped>
.page{}
</style>
