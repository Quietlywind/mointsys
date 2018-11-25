<template>
  <div class="configure_early_warn" style="padding:10px;">
    <Row :gutter="16">
      <i-col :span="24" style="margin-bottom:15px;">
        <div>
          <Button type="primary" @click="editEarly">修改</Button>
        </div>
      </i-col>
      <i-col :span="24">
        <table class="early_warn_table" style="width:100%;" >
          <thead>
            <tr>
              <th style="width:10%;"></th>
              <th>电流（A）</th>
              <th>电压（v）</th>
              <th>功率因素（φ）</th>
              <th>温度（℃）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">安全区间</td>
              <td style="text-align:center;">
                <Input v-model="value1" style="width:70px;"/>
                <span>&lt;=电流&lt;=</span>
                <Input v-model="value2"  style="width:70px;"/>
              </td>
              <td>
                <Input v-model="value3" style="width:70px;"/>
                <span>&lt;=电压&lt;=</span>
                <Input v-model="value4" style="width:70px;"/>
              </td>
              <td>
                <Input v-model="value5" style="width:70px;"/>
                <span>&lt;=功率因素&lt;=</span>
                <Input v-model="value6" style="width:70px;"/>
              </td>
              <td>
                <Input v-model="value7" style="width:70px;"/>
                <span>&lt;=温度&lt;=</span>
                <Input v-model="value8" style="width:70px;"/>
              </td>
            </tr>
          </tbody>
        </table>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      value1:'',
      value2:'',
      value3:'',
      value4:'',
      value5:'',
      value6:'',
      value7:'',
      value8:'',
    }
  },
  components: {

  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    editEarly(){
      this.$confirm('是否保存该预警配置?', '提示', {type: 'warning'}).then(() => {
        this.$message.success({showClose:'true',message: '配置保存成功!',duration:'2000'});
      }).catch(() => {
        this.$message.error({showClose:'true',message: '取消保存',duration:'2000'});          
      });
    }
  },
  created(){},
  mounted(){}
}
</script>

<style lang="less">
.configure_early_warn{}
table.early_warn_table{
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table.early_warn_table thead th{
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    // background-color: #dedede;
  }
  table.early_warn_table tbody td{
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
</style>
