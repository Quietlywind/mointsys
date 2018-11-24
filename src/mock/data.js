import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

const typedevice=['台变','箱变']
const statusdevice=['在线','预警','未联网','故障','部分在线']
const earlyWarn=['报警','报警解除']
const handleDeal=['否','是']
// 运行监控假数据
export const operationData = req =>{
    let tableData=[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            deviceName:'@name',
            deviceId:Random.guid(),
            deviceType:typedevice[Math.floor((Math.random()*typedevice.length))],
            deviceAddress:Random.city('true'),
            deviceStatus:statusdevice[Math.floor((Math.random()*statusdevice.length))],
            deviceTime:Random.date(),
            notice:''
        }))
    })
    return tableData
}
//视频监控假数据
export const videoData = req =>{
    let tableData=[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            deviceName:'@name',
            deviceId:Random.guid(),
            deviceAddress:Random.ctitle(2, 12),
            deviceStatus:statusdevice[Math.floor((Math.random()*statusdevice.length))],
            deviceTime:Random.date(),
            operation:''
        }))
    })
    return tableData
}
//预警监控假数据
export const earlyDate = req =>{
    let tableData =[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            id:Random.id(),
            deviceName:'@name',
            earlyTime:Random.date(),
            earlyContent:Random.ctitle(2, 6),
            earlyStatus:earlyWarn[Math.floor((Math.random()*earlyWarn.length))],
            recoveryTime:Random.date(),
            handle:handleDeal[Math.floor((Math.random()*handleDeal.length))],
            handlePerson:'@cname',
            operationTime:Random.date(),
            action:''
        }))
    })
    return tableData
}
const switchData=['开','关']
//安全检查假数据
export const securityData = req =>{
    let tableData =[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            deviceName:'@name',
            earlyTime:Random.date(),
            electric:Random.float(1,100,1,2),
            voltage:Random.float(1,100,1,2),
            powerfactor:Random.float(1,100,1,2),
            temperature:Random.float(1,100,1,2),
            switch:switchData[Math.floor((Math.random()*switchData.length))],
            control:switchData[Math.floor((Math.random()*switchData.length))],
        }))
    })
    return tableData
}

const orderData=['处理中','未处理','已处理','已归档']
//工单列表假数据
export const workorderData = req =>{
    let tableData =[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            name:'@name',
            id:Random.guid(),
            time:Random.date('yyyy-MM-dd HH:mm'),
            content:Random.ctitle(2,10),
            person:'@cname',
            recoveryTime:Random.date('yyyy-MM-dd HH:mm'),
            status:orderData[Math.floor((Math.random()*orderData.length))],
            action:''
        }))
    })
    return tableData
}
const mentStatus=[0,1]
//设备管理假数据
export const equipmentData = req =>{
    let tableData =[];
    doCustomTimes(15,()=>{
        tableData.push(Mock.mock({
            name:'@name',
            id:Random.guid(),
            type:typedevice[Math.floor((Math.random()*typedevice.length))],
            place:Random.city('true'),
            time:Random.date('yyyy-MM-dd HH:mm'),
            lng:Random.float(1,30,5,7),
            lat:Random.float(1,104,5,7),
            status:mentStatus[Math.floor((Math.random()*mentStatus.length))],
            action:''
        }))
    })
    return tableData
}