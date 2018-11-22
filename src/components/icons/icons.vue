<template>
    <i :class="`iconfont icon-${type}`" :style="style"></i>
</template>
<script>
export default {
    name: 'Icons',
    props: {
      type: {
       type: String,
       required: true
      },
      color: {
       type: String,
       default: '#5c6b77'
      },
      size: {
       type: Number,
       default: 16
      }
    },
    computed:{
        style(){
            return {
                fontSize:`${this.size}px`,
                color:this.color
            }
        }
    }
}
</script>

