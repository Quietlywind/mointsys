import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

const typedevice=['台变','箱变']
const statusdevice=['在线','预警','未联网','故障','部分在线']
export const operationData = req =>{
    let tableData=[];
    doCustomTimes(10,()=>{
        tableData.push(Mock.mock({
            deviceName:'@name',
            deviceId:Mock.Random.guid(),
            deviceType:typedevice[Math.floor((Math.random()*typedevice.length))],
            deviceAddress:Mock.Random.ctitle(2, 12),
            deviceStatus:statusdevice[Math.floor((Math.random()*statusdevice.length))],
            deviceTime:Mock.Random.date(),
            notice:''
        }))
    })
    console.log(tableData)
    return tableData
}