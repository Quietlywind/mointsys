import Mock from 'mockjs'
import {operationData,videoData} from './data'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout:500-1000
})

//返回数据地址
// Mock.mock(/\/get_opera_data/,operationData)
Mock.mock('/operationData',operationData)
Mock.mock('/videoData',videoData)
