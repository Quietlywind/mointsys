<template>
  <div class="work_list_page" style="padding: 10px;">
    <Row :gutter="16">
      <Col span="24">
        <Form ref="formInline" :mode="formInline" :rules="ruleInline" inline :label-width="60">
          <FormItem prop="workorderId" :label-width="0">
              <Input v-model="formInline.workorderId" placeholder="输入工单编号"></Input>
          </FormItem>
          <FormItem prop="time" label="派发时间">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择派发时间" v-model="formInline.time"></DatePicker>
          </FormItem>
          <FormItem prop="status" label="工单状态">
            <Select v-model="formInline.status" style="width:162px;">
                <Option v-for="item in StatusData" :value="item.value" :key="item.value" :label="item.label">
                  {{item.label}}
                </Option>
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="search">查询</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="24">
        <Table border :loading="loading" 
            :columns="tablecolums1" 
            :data="tableData" 
            no-data-text="暂无数据">
        </Table>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      formInline:{
        workorderId:'',
        time:'',
        status:''
      },
      ruleInline:{},
      loading:true,
      limit:10,
      page:1,
      tableData:[],
       tablecolums1:[
        {title:'工单编号',key:'id',ellipsis:true,tooltip:true,},
        {title:'派发时间',key:'time',ellipsis:true,tooltip:true,sortable:true},
        {title:'派发内容', key:'content',ellipsis:true,tooltip:true},
        {title:'负责人', key:'person'},
        {title:'恢复时间',key:'recoveryTime',sortable:true},
        {title:'工单状态',key:'status'},
        {title:'操作',key:'action',width: 150,align: 'center',
          render:(h,params) =>{
            return h('div',[
              h('a',{
                  props:{
                    type:'primary',
                    size:'small'
                  },
                  style:{
                    cursor: 'pointer',
                    fontWeight:'700'
                  },
                  on:{
                    click:()=>{
                      this.showWorkList(params.row)
                    }
                  }
                },'查看')
            ])
          }
        },
      ],
      StatusData:[
        {value:'',label:'请选择'},
        {value:'1',label:'处理中'},
        {value:'2',label:'未处理'},
        {value:'3',label:'已归档'},
      ],
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
      let params = Object.assign({}, this.formInline);
      params.page=this.page;
      params.limit=this.limit;
      this.$axios.post('/workorderData').then((res)=>{
        this.tableData=res.data
        this.loading=false
      }).catch((err)=>{
        console.log(err)
      })
    },
    showWorkList(row){
      console.log(row)
    }
  },
  created(){},
  mounted(){
    this.search();
  }
}
</script>

<style scoped lang="less">
.work_list_page{

}
</style>
