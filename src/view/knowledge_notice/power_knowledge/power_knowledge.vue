<template>
  <div class="page">
    <Button @click="start">Start</Button>
      <Button @click="finish">Finish</Button>
      <Button @click="error">Error</Button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  },
  props:{},
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

<style scoped>
.page{}
</style>
