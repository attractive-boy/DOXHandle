// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios");


cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

let errorDate = []

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  for (let i = 0; i < form.length; i++) {
    if(i <= 4){
      continue
    }
    const item = form[i];
    for (let j = 0; j < item.date.length; j++) {
      const dateItem = item.date[j];
      const url = `https://www.mxnzp.com/api/holiday/single/${dateItem.date}?ignoreHoliday=false&app_id=lkrfjohtlmjeor0v&app_secret=FWOrKsIcX9mwds0SGYc7p97hl8MDO6U9`
      const res = await axios.get(url)
      if(res.data.typeDes != "工作日")
      {
        errorDate.push({
          name : item.name,
          date : dateItem.date,
        })
      }
    }
  }
  return {
    errorDate: errorDate,
  }
}