export const forEach = (arr,fn) => {
    if(!arr.length || !fn) return
    let i = -1;
    let len = arr.length
    while(++i<len){
        let item = arr[i]
        fn(item,i,arr)
    }
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetter,arr) =>{
    return targetter.some(_ => arr.indexOf(_) > -1)
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function(){
    if(document.addEventListener){
        return function(element,event,handler){
            if(element && event && handler){
                element.addEventListener(event,handler,false)
            }
        }
    }else{
        return function(element,event,handler){
            if(element && event && handler){
                element.attachEvent('on'+event,handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off =(function(){
    if(document.addEventListener){
        return function(element,event,handler){
            if(element && event){
                element.removeEventListener(event,handler,false)
            }
        }
    }else{
        return function(element,event,handler){
            if(element && event){}
            element.detachEvent('on'+event,handler)
        }
    }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj,key) => {
    if(key) return key in obj
    else{
        let keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1,obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if(keysArr1.length !== keysArr2.length) return false
    else if(keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}