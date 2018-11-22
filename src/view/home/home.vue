<template>
  <div class="map" id="map" style="width:100%;height:100%;">
      
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  components:{

  },
  props:{},
  data(){
    return {
      map: null,
      CRS:'Simple',
      map_config:{
        center:[30.657445, 104.065757],
        zoom:6,
        layers:null,
        minZoom:6,
        maxZoom:18,
        opacity:0.1,
        zoomControl:true,
        attribution:"&copy; 高德地图",
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    initMap(){
      this.map = L.map('map',{
        center:this.map_config.center,
        zoom:this.map_config.center,
        minZoom:this.map_config.minZoom,
        maxZoom:this.map_config.maxZoom,
        zoomControl:this.map_config.zoomControl,
        attribution:this.map_config.attribution
      })
    }
  },
  created(){},
  mounted(){
    this.initMap()
  }
}
import './home.js'
</script>
<style lang="less">
@import './home.less';
</style>