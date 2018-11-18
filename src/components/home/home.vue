<template>
  <div class="wrapper">
      <Button @click="start">Start</Button>
      <Button @click="finish">Finish</Button>
      <Button @click="error">Error</Button>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    start () {
        this.$Loading.start();
    },
    finish () {
        this.$Loading.finish();
    },
    error () {
        this.$Loading.error();
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.wrapper{}
</style>