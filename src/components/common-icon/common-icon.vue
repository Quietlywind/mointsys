<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize" />
</template>

<script>
import Icons from '@comp/icons'
export default {
  name: 'CommonIcon',  
  components:{
      Icons
  },
  props:{
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    iconType () {
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 14 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods:{
    //判断是否是iview自带的图标返回自定义图标名
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
  },
  created(){},
  mounted(){}
}
</script>