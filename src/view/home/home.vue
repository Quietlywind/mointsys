<template>
  <div style="width:auto;height:100%;">
    <div class="map" id="map" style="width:100%;height:100%;">  
    </div>
  </div>
</template>

<script>
import Leaflet from 'leaflet'
import mapProvider from './leaflet.MapProviders.js'
// import '@/assets/leaflet/js/leaflet.ChineseTmsProviders.js'

export default {
  components:{},
  props:{},
  data(){
    return {
      map: null,
      CRS:'Simple',
      map_config:{
        center:[30.657445, 104.065757],
        zoom:6,
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
      this.map =new L.map('map',{
        center:this.map_config.center,
        zoom:this.map_config.center,
        minZoom:this.map_config.minZoom,
        maxZoom:this.map_config.maxZoom,
        zoomControl:this.map_config.zoomControl
      })
    },
    addMapLayer() {
                L.tileLayer.mapProvider('GaoDe.Normal.Map',
                    {attribution: this.map_config.attribution}).addTo(this.map);
            },
  },
  created(){},
  mounted(){
    this.initMap()
    this.addMapLayer()
  }
}
</script>
<style lang="less">
</style>