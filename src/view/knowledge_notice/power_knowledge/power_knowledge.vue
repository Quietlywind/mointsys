<template>
  <div class="power_knowledge">
    <Row :gutter="16">
      <i-col :span="24">
        <Card>
          <Row>
            <span style="float:left;line-height: 32px;">知识标题：</span>
            <i-col :span="20">
              <Input size="default" v-model="knowledge_titile" suffix="md-list-box" placeholder="请输入知识标题" />
            </i-col>
          </Row>
        </Card>
      </i-col>
      <i-col :span="24">
        <editor class="power_knowledge_editor" 
          :value="content"
          :setting="editorSetting"
          @input="editors"
          :url="Url"
          :max-size="MaxSize"
          :accept="Accept"
          :with-credentials="withCredentials"
          @on-upload-fail="onEditorReady"
          @on-upload-success="onEditorUploadComplete"></editor>
      </i-col>
      <i-col :span="24" style="margin-top:15px;text-align: right;padding-right:20px;">
        <Button type="primary" @click="editors">保存</Button>
      </i-col>
    </Row>
    
  </div>
</template>

<script type="text/ecmascript-6">
import Editor from '@comp/editor' //引入富文本编辑器
export default {
  data() {
    return {
      knowledge_titile:'',
      editorSetting:{ // 配置富文本编辑器高
        height: 300
      },
      Url:'',
      MaxSize: 75765, // 文件大小
      Accept: 'image/png,image/jpg,image/jpeg', // 图片文件格式
      withCredentials: true,
      content: '' // 富文本编辑器双向绑定的内容
    }
  },
  components: {
    Editor
  },
  props:{},
  watch:{},
  computed:{},
  methods:{
    editors(item){ // editor组件传过来的值赋给content
      console.log(item)
      // this.content = val
    },
    onEditorReady(ins, ina) { // 上传失败的函数
        console.log('ins')
        console.log(ins)
        console.log(ina)
    },
    onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
        console.log('json')
        console.log(json)
        console.log(json[0].data.filePath)
        this.content = this.content + '<img src=' + json[0].data.filePath + '>'
    }
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
.power_knowledge{

}
</style>
