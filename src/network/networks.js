import { request1, request2 } from './request'

export function loginAxios (config) {
  return request1({
    url: '/login.php',
    params: config
  })
}
export function weather () {
  return request2({
    url: '/tianqi3day.php'
  })
}
export function userAll (config) {
  return request2({
    url: '/yxList.php',
    params: config
  })
}
export function delectData (id) {
  return request2({
    url: '/yxDelRow.php',
    params: {
      id: id
    }
  })
}
export function classKefu () {
  return request2({
    url: '/yxLoad.php'
  })
}
export function submitData (clientData) {
  return request2({
    url: '/yxAdd.php',
    params: clientData
  })
}
export function chongfuYanZheng (myObj) {
  return request2({
    url: '/yxValidate.php',
    params: myObj
  })
}
export function editGet (id) {
  return request2({
    url: '/yxRow.php',
    params: {
      id
    }
  })
}
// editSubmit
export function editSubmit (myobj) {
  return request2({
    url: '/yxUpdata.php',
    params: myobj
  })
}
// 折线图
export function echarts1 (myobj) {
  return request2({
    url: '/dataPaiming.php',
    params: {
      pullTime: myobj
    }
  })
}
// 饼状图
export function pie (myobj) {
  return request2({
    url: '/dataFenBu.php',
    params: {
      pullTime: myobj
    }
  })
}
