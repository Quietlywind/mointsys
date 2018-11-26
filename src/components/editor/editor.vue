<template>
  <div class="editor_page">
      <textarea :id="id" :value="value"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/fullscreen';
const INIT = 0;
const CHANGED = 2;
// var EDITOR = null;
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
        default:'',
        type:String,
        // editor:null,
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
    //   value(val){
    //     console.log('init ' + val)
    //     if(this.status === INIT || tinymce.activeEditor.getContent() !== val){
    //         tinymce.activeEditor.setContent(val)
    //     }
    //     this.status = CHANGED
    //   }
  },
  computed:{},
  methods:{
    handleImgUpload(blobInfo,success,failure){
        let formdata = new FormData()
        if(blobInfo.blob().size > this.maxSize){
            failure('文件体积过大')
        }
        if(this.accept.indexOf(blobInfo.blob().type) >= 0){
            this.uploadPic()
        }else{
            failure('图片格式错误')
        }
    },
    uploadPic(){

    }
  },
  created(){},
  mounted(){
      const _this=this;
      const setting ={
        selector:'#'+_this.id,
        menubar: true,//去除文件栏
        branding: false,//去除右下角的'由tinymce驱动'
        upload_image_url:'',//配置的上传图片的路由
        language:'zh_CN', //语言设置为中文
        language_url:'../../../static/tinymce/zh_CN.js', //导入中文语言文件
        skin_url:'../../../static/tinymce/skins/lightgray',
        init_instance_callback:function(editor){
            // EDITOR = editor;
            editor.on('input change undo redo', () =>{
                _this.$emit('input',editor.getContent())
            })
        },
        inser_button_items:'image link | inserttable',  //指定哪些按钮在插入菜单显示
        // CONFIG: Paste
        paste_retain_style_properties:'all',  //此选项允许您指定在粘贴MS Word中的内容时要保留的样式，"all"表示要保留所有样式
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        // fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 26px 30px',
        // 'plugins': [
        //   'advlist link image',
        //   'code',
        //   'table paste textcolor colorpicker'
        // ], // 配置
        // 'toolbar_items_size': 'small',
        // 'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
        // 'toolbar1': 'table |insertfile undo redo | formatselect | link unlink | uploadimg image media', // 工具栏1
        // 'toolbar2': ' fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
        // // 图片上传
        // images_upload_handler: function(blobInfo, success, failure) {
        //     this.handleImgUpload(blobInfo,success,failure)
        // },
      }
      Object.assign(setting, _this.setting)
      tinymce.init(setting)
  },
  beforeDestroy:function () {
    tinymce.get(this.id).destroy()
  }
}
</script>

<style lang="less">
.editor_page{}
</style>
