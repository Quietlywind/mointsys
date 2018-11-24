<template>
  <div class="page">
    <Card>
      <h2>ID: {{ $route.query.id }}</h2>
      <h2>name: {{ $route.query.name }}</h2>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'order_create',
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
  mounted(){
  }
}
</script>

<style scoped>
.page{}
</style>
