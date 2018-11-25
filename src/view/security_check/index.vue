<template>
  <div class="security_page">
    <Row>
      <i-col span="24">
        <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="tableData" 
            no-data-text="暂无数据">
        </Table>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      loading:true,
      InitSetInterval:null,
      tableData:[],
      tablecolums1:[
        {title:'设备名称',key:'deviceName'},
        {title:'时间',key:'earlyTime',ellipsis:true,tooltip:true,sortable:true},
        {title:'电流（A）', key:'electric',},
        {title:'电压（V）', key:'voltage'},
        {title:'功率因素（φ）',key:'powerfactor'},
        {title:'温度（℃）',key:'temperature'},
        {title:'分合闸状态',key:'switch'},
        {title:'门禁开闭合状态',key:'control'},
      ]
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    search(){
      this.loading=true;
      this.$axios.post('/securityData').then((res)=>{
        this.tableData=res.data
        this.loading=false
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  created(){},
  mounted(){
    this.search()
  }
}
</script>

<style scoped>
.page{}
</style>
