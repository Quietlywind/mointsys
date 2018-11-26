<template>
  <div class="editor_page">
      <textarea :id="id" :value="value"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/colorpicker'
const INIT = 0
const CHANGED = 2
export default {
  data() {
    return {
        status:INIT,
        id:'editor' + new Date().getMilliseconds()
    }
  },
  components: {

  },
  props:{
    value:{
        type:String,
        editor:null,
        required:true
    },
    setting:{},
    url:{
        default:'',
        type:String
    },
    accept:{
        default:'image/png,image/jpg,image/jpeg',
        type:String
    },
    maxSize:{
        default:2097152,
        type:Number
    },
    withCredentials:{
        default:false,
        type:Boolean
    }
  },
  watch:{
      value(val){
          console.log(val)
          if(this.status === INIT || tinymce.activeEditor.getContent() !== val){
              tinymce.activeEditor.setContent(val)
          }
          this.CHANGED = CHANGED
      }
  },
  computed:{},
  methods:{},
  created(){},
  mounted(){
      let _this=this;
      let setting ={
        selector:'#'+_this.id,
        upload_image_url:'',//配置的上传图片的路由
        language:''
      }

  }
}
</script>

<style lang="less">
.editor_page{}
</style>
