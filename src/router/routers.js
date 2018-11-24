import Main from '@/components/main'



export default [
    {
        path:'/login',
        name:'login',
        meta:{
           title:'Login - 登录',
           hideInMenu : true
        },
        component : ()=> import('@/view/login/login.vue')
    },
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: Main,
      meta:{
        hideInMenu:false,
        notCache:true
      },
      children :[
        {
          path:'/home',
          name:'home',
          meta:{
            hideInMenu:false,
            title:'地图监控',
            notCache:true,
            icon:'md-home'
          },
          component : ()=> import('@/view/home/home.vue')
        }
      ]
    },
    {
      path:'/remote',
      name:'remote',
      component:Main,
      meta:{
        // hideInBread:true
        icon:'md-desktop',
        title:'远程监控'
      },
      children:[
        {
          path:'early_warn',
          name:'early_warn',
          meta:{
            icon:'md-trending-up',
            title:'预警监控'
          },
          component:() => import('@/view/remote_monitor/early_warn/early_warn.vue')
        },
        {
          path:'operation',
          name:'operation',
          meta:{
            icon: 'ios-infinite',
            title:'运行监控'
          },
          component:() =>import('@/view/remote_monitor/operation/operation.vue')
        },
        {
          path:'video',
          name:'video',
          meta:{
            icon:'ios-videocam',
            title:'视频监控'
          },
          component:() =>import('@/view/remote_monitor/video/video.vue')
        }
      ]
    },
    {
      path:'/security',
      name:'security',
      component:Main,
      meta:{
        hideInBread:true,
      },
      children:[
        {
          path:'security_check',
          name:'security_check',
          meta:{
            icon: 'md-checkbox-outline',
            title:'安全检查'
          },
          component:() =>import('@/view/security_check/index.vue')
        }
      ]
    },
    {
      path:'/worklist',
      name:'worklist',
      component:Main,
      meta:{
        hideInBread:true,
      },
      children:[
        {
          path:'work_list',
          name:'work_list',
          meta:{
            icon: 'md-alarm',
            title:'工单列表'
          },
          component:() =>import('@/view/work_list/work_list.vue')
        }
      ]
    },
    {
      path: '/statistical',
      name: 'statistical',
      meta: {
        icon: 'ios-book',
        title: '统计分析'
      },
      component: Main,
      children:[
        {
          path:'line_history',
          name:'line_history',
          meta:{
            icon:'md-trending-up',
            title:'线路历史数据'
          },
          component:() => import('@/view/statistical_analysis/line_history/line_history.vue')
        },
        {
          path:'transformer_ratio',
          name:'transformer_ratio',
          meta:{
            icon:'md-trending-up',
            title:'变压器占比'
          },
          component:() => import('@/view/statistical_analysis/transformer_ratio/transformer_ratio.vue')
        }
      ]
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      meta: {
        icon: 'ios-book',
        title: '知识公告'
      },
      component: Main,
      children:[
        {
          path:'power_knowledge',
          name:'power_knowledge',
          meta:{
            icon:'md-trending-up',
            title:'电力知识'
          },
          component:() => import('@/view/knowledge_notice/power_knowledge/power_knowledge.vue')
        },
        {
          path:'power_notice',
          name:'power_notice',
          meta:{
            icon:'md-trending-up',
            title:'电力公告'
          },
          component:() => import('@/view/knowledge_notice/power_notice/power_notice.vue')
        }
      ]
    },
    {
      path:'/configure',
      name:'configure',
      meta:{
        icon: 'md-settings',
        title: '配置管理'
      },
      component: Main,
      children:[
        {
          path:'early_warn_set',
          name:'early_warn_set',
          meta:{
            icon:'md-trending-up',
            title:'预警配置'
          },
          component:() => import('@/view/configure_manage/early_warn_set/early_warn_set.vue')
        },
        {
          path:'equipment_set',
          name:'equipment_set',
          meta:{
            icon:'md-trending-up',
            title:'设备管理'
          },
          component:() => import('@/view/configure_manage/equipment_set/equipment_set.vue')
        },
        {
          path:'knowledge_set',
          name:'knowledge_set',
          meta:{
            icon:'md-trending-up',
            title:'知识管理'
          },
          component:() => import('@/view/configure_manage/knowledge_set/knowledge_set.vue')
        },
        {
          path:'notice_set',
          name:'notice_set',
          meta:{
            icon:'md-trending-up',
            title:'公告管理'
          },
          component:() => import('@/view/configure_manage/notice_set/notice_set.vue')
        },
        {
          path:'user_set',
          name:'user_set',
          meta:{
            icon:'md-trending-up',
            title:'用户管理'
          },
          component:() => import('@/view/configure_manage/user_set/user_set.vue')
        },
        // {
        //   path:'sms_set',
        //   name:'sms_set',
        //   meta:{
        //     icon:'md-trending-up',
        //     title:'短信通知管理'
        //   },
        //   component:() => import('@/view/configure_manage/sms_set/sms_set.vue')
        // },
        {
          path:'message_set',
          name:'message_set',
          meta:{
            icon:'md-trending-up',
            title:'消息推送管理'
          },
          component:() => import('@/view/configure_manage/message_set/message_set.vue')
        },
      ]
    },
    {
      path:'/order',
      name:'order',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children:[
        {
          path:'order_create',
          name:'order_create',
          meta:{
            icon: 'md-flower',
            title:route => `工单-${route.query.id}`,
            notCache:true
          },
          component: () => import('@/view/order_create/order_create.vue')
        }
      ]
    }
  ]