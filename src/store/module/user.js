

import {setToken,getToken} from '@/libs/util'

export default{
    state:{
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false,
        unreadCount: 0,
        messageUnreadList: [],
        messageReadedList: [],
        messageTrashList: [],
        messageContentStore: {}
    },
    mutations:{
        setAvator(state,avatorImgPath){
            state.avatorImgPath=avatorImgPath
        },
        setUserId(state,id){
            state.userId=id
        },
        setUserName(state,name){
            state.userName=name
        },
        setAccess(state,access){
            state.access=access
        },
        setToken(state,token){
            state.token=token
            setToken(token)
        },
        setHasGetInfo(state,status){
            state.hasGetInfo=status
        },
        setMessageCount(state,count){
            state.setMessageCount = count
        },
        setMessageUnreadList(state,list){
            state.messageUnreadList = list
        },
        setMessageReadedList(state,list){
            state.messageReadedList=list
        },
        setMessageTrashList(state,list){
            state.messageTrashList=list
        },
        updateMessageContentStore(state,{msg_id,content}){
            state.messageContentStore[msg_id] = content
        }
    },
    getters:{
        messageUnreadCount : state =>state.messageUnreadList.length,
        messageReadedCount : state =>state.messageReadedList.length,
        messageTrashCount : state =>state.messageTrashList.length
    },
    actions: {
        //登录
        handleLogin ({commit},{userName,password}){
            userName = userName.trim()
            return new Promise((resolve,reject)=>{
                resolve()
            })
        },
        //退出登录
        handleLogOut ({state,commit}){
            return new Promise((resolve,reject)=>{
                logout(state.token).then(()=>{
                    commit('setToken','')
                    commit('setAccess',[])
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        //获取用户相关信息
        getUserInfo({state,commit}){
            return new Promise((resolve,reject)=>{
                try{
                    this.getUserInfo(state.token).then(res=>{
                        const data =res.data
                        commit('setAvator',data.avator)
                        commit('setUserName',data.name)
                        commit('setUserId',data.user_id)
                        commit('setAccess',data.access)
                        commit('setHasGetInfo',true)
                        resolve(data)
                    }).catch(err=>{
                        reject(err)
                    })
                }catch(error){
                    reject(error)
                }
            })
        },

    }
}