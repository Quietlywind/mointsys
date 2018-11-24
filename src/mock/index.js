import Mock from 'mockjs'
import {operationData,videoData,earlyDate,securityData,workorderData,equipmentData} from './data'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout:500-1000
})

//返回数据地址
// Mock.mock(/\/get_opera_data/,operationData)
Mock.mock('/operationData',operationData)
Mock.mock('/videoData',videoData)
Mock.mock(/\/earlyDate/,earlyDate)
Mock.mock(/\/securityData/,securityData)
Mock.mock(/\/workorderData/,workorderData)
Mock.mock(/\/equipmentData/,equipmentData)
