<template>
  <div style="width:auto;height:100%;position: relative;">
    <div style="position: absolute;z-index: 9999;left: 70px;top: 20px;width: 250px;">
      <Input search enter-button v-model="mapLatLng" placeholder="请输入设备名称" @on-search="search(mapLatLng)"/>
    </div>
    <div class="map" id="map" style="width:100%;height:100%;">
      <l-map ref="map" 
      :zoom.sync="map_config.zoom"
      :center.sync="map_config.center" 
      :min-zoom="map_config.minZoom" 
      :max-zoom="map_config.maxZoom"
      :max-bounds="bounds" :options="mapOptions"
      @click="markerMoved($event)">
      <!-- url="/mapurl/localecache/{z}/{x}/{y}.png" -->
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" :attribution="map_config.attribution"></l-tile-layer>
        <l-marker :lat-lng="map_config.marker" >
          <l-popup>
              <p>设备名称：九变路22#</p>
              <p>设备编号：九变路22#</p>
              <p>联网状况：正常</p>
              <Button type="primary" long>查看设备详情</Button>
          </l-popup>
        </l-marker>
        <l-circle :lat-lng="circle.center" :color="circle.color" :radius="circle.radius">
          <l-popup>我是圆</l-popup>
        </l-circle>
        <!-- <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color" :weight="5" /> -->
      </l-map>
    </div>
  </div>
</template>

<script>
import {LMap,LTileLayer,LMarker,LPopup,LControlZoom,LCircle,LRectangle,LPolyline,LLayerGroup,LControlLayers} from 'vue2-leaflet'

export default {
  components:{
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom,
    LCircle,
    LRectangle,
    LPolyline,
    LLayerGroup,
    LControlLayers
  },
  props:{},
  data(){
    return {
      map:null,
      CRS:'Simple',
      mapLatLng:'', //搜索框文本
      bounds: [ //地图的东西南北最大边界，
            //在缩放级别和是的情况下，地图只会展示在当前的区域内
            //south west
            [30.444338, 103.496841],
            //north east
            [30.846008, 104.363814]
      ],
      mapOptions: { zoomControl: true, attributionControl: false, zoomSnap: true },
      map_config:{
        center: [30.657445,104.065757],
        marker: [30.657445,104.065757],
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:"&copy; 高德地图",
      },
      circle:{
        center: [30.659445, 104.063657],
        radius: 40,
        color:'red',
      },
      polyline:{
        type: 'polyline',
        latlngs:[[30.657445, 104.065757],[30.659445, 104.063657],[30.65951049397805,104.06005382537842],[30.65443436526798,104.05960321426393]],
        color:'green',
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    search(val){
      console.log(this.map.layerPointToLatLng([30.659445, 104.063657]))
      
      this.map.setView([30.659445, 104.063657],18)
    },
    markerMoved(e){
      console.log(e)
      console.log(this.map.getBounds())
    }
  },
  created(){},
  mounted(){
    this.$nextTick(()=>{
      this.map = this.$refs.map.mapObject // work as expected
      var polyline=L.polyline(this.polyline.latlngs, {color: 'red',weight:'2'}).addTo(this.map)
      // this.map.addLayer(polyline)
    })
  }
}
</script>
<style lang="less">
  .leaflet-popup-content p{
    margin: 10px 0;
  }
</style>