import { timeHandle } from '@/assets/js/common'
import { chongfuYanZheng } from '@/network/networks.js'
import that from '@/main.js'
// 多重验证
export var ruleContact = (rules, value, callback) => {
  if (value == '') {
    return callback()
  }
  let userData = window.sessionStorage.getItem('userData')
  userData = JSON.parse(userData)
  if (userData) {
    const butterData = userData[rules.field]
    if (butterData == value) {
      return callback()
    }
  }
  const field = rules.field
  let itemOfTest
  if (field === 'contact') {
    itemOfTest = '电话'
    if (!(/^[1][3,5,7,8,9][0-9]{9}$/).test(value)) {
      return callback(new Error('电话格式错误'))
    }
  } else if (field === 'weixin') {
    itemOfTest = '微信'
    if (!(/^[a-zA-Z0-9_-]{5,19}$/.test(value))) {
      return callback(new Error('微信格式错误'))
    }
  }
  const myobj = {
    keyword: value,
    field: field
  }
  chongfuYanZheng(myobj).then((ret) => {
    // console.log(ret);
    const content = ret.data.content
    if (ret.data.code == 403) {
      const text = `
                     ${itemOfTest}为:${content.contact}的用户已经存在.<br>
                    客户名称为:"${content.nickname}".<br>
                    录入时间为${timeHandle(content.posttime)}请勿重复提交！    
                `
      that.$confirm(text, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).catch(() => {})
      return callback(new Error('该用户已经存在'))
    } else {
      return callback()
    }
  })
}
