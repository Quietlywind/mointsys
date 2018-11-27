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
import 'tinymce/plugins/preview';
const INIT = 0;
const CHANGED = 2;
// var EDITOR = null;
export default {
  data() {
    return {
        status:INIT,
        id:'editor' + new Date().getMilliseconds(),
        flag:true
    }
  },
  components: {

  },
  props:{
    value:{
        default:'',
        type:String,
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
    //     if(this.status === INIT || tinymce.activeEditor.getContent() !== val){
    //         tinymce.activeEditor.setContent(val)
    //     }
    //     this.status = CHANGED
    //   }
    value(val){
        if(this.flag){
            tinyMCE.activeEditor.setContent(val);
        }
        this.flag=true;
    }
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
            // change
            editor.on('input change undo redo execCommand', () =>{
                _this.flag=false;
                _this.$emit('input',editor.getContent())
            })
        },
        // forced_root_block:'',
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
          
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
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 26px 30px',
        'plugins': [
          'advlist link image',
          'code',
          'table paste textcolor colorpicker',
          'fullscreen'
        ], // 配置
        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        toolbar_items_size: 'small',
        block_formats: `Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;`,
        toolbar1: 'insertfile undo redo | formatselect | table link unlink | uploadimg image media', // 工具栏1
        toolbar2: 'fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | fullscreen', // 工具栏2
        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
            _this.handleImgUpload(blobInfo,success,failure)
        },
      }
      Object.assign(setting, _this.setting)
      tinymce.init(setting)
  },
  beforeDestroy() {
    tinymce.get(this.id).destroy()
  }
}
</script>

<style lang="less">
.mce-fullscreen{
    z-index:999 !important;
}
</style>
