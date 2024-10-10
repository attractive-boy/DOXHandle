// pages/datecheck/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: [
      {
        name: "现场笔录",
        date: [
          {
            name: "被检查人或现场负责人（签名）、见证人（签名）、检查人（签名）：",
            date: '',
          }
        ],
        
      },
      {
        name: "证据先行登记保存批准书",
        date: [
          {
            name: "承办人（签名）、负责人意见并签名：",
            date: '',
            
          }
        ],
        
      },
      {
        name: "证据先行登记保存通知书",
        date: [
          {
            name: "当事人、见证人、承办人（签名）：",
            date: '',
            
          },
        ],
        
      },
      {
        name: "证据先行登记保存通知书送达回证",
        date: [
          {
            name: "签收日期、落款：",
            date: '',
            
          },
        ],
        
      },
      {
        name: "立案报告表",
        date: [
          {
            name: "承办人意见、承办部门意见、负责人意见：",
            date: '',
            
          }
        ],
        
      },
      {
        name: "询问笔录",
        date: [
          {
            name: "被询问人、询问人（签名）：",
            date: '',
            
          },
        ],
        
      },
      {
        name: "证据复制(提取)单",
        date: [
          {
            name: "复制（提取）时间：",
            date: '',
          }
        ],
        type:0
      },
      {
        name: "抽样取证物品清单",
        date: [
          {
            name: "承办人、当事人、见证人（签名）：",
            date: '',
            
          }
        ],
        

      },
      {
        name: "县级局涉案烟草专卖品案值计算审批表",
        date: [
          {
            name: "申请事由：",
            date: '',
            
          },
          {
            name: "案件承办部门负责人意见：",
            date: '',
            
          },
          {
            name: "价格管理小组意见：",
            date: '',
            
          }
        ],
        

      },
      {
        name:"价格认定结论书-镇远县改",
        date:[
          {
            name:"落款：",
            date: '',
            type:0
          },
        ],
        type:0
      },
      {
        name: "涉案物品核价表",
        date: [
          {
            name: "落款日期：",
            date: '',
            
          }
        ],
        
      },
 
      {
        name: "先行登记保存证据处理通知书",
        date: [
          {
            name: "当事人、承办人：",
            date: '',
            
          }
        ],
        
      },
      {
        name: "先行登记保存证据处理通知书送达回证",
        date: [
          {
            name: "落款：",
            date: '',
            
          }
        ],
        
      },
      {
        name:"涉案物品返还清单",
        date:[
          {
            name:"接收人、返还人：",
            date: '',
            type:0
          }
        ],
        type:0
      },
      {
        name:"案件调查终结报告",
        date:[
          {
            name:"处理意见：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"案件处理审批表",
        date:[
          {
            name:"承办人意见：",
            date: '',
            type:0
          },
          {
            name:"承办部门意见：",
            date: '',
            type:0
          },
          {
            name:"法制部门意见:",
            date: '',
            type:0
          },
          {
            name:"负责人意见：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"行政处罚事先告知书",
        date:[
          {
            name:"落款：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"行政处罚事先告知书送达回证",
        date:[
          {
            name:"签收日期：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"结案报告表",
        date:[
          {
            name:"承办人结案理由：",
            date: '',
            type:0
          },
          {
            name:"承办部门意见：",
            date: '',
            type:0
          },
          {
            name:"负责人意见：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"卷内备考表",
        date:[
          {
            name:"立卷时间：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"行政处罚决定书",
        date: [
          {
            name:"落款：",
            date: '',
            type:0
          }
        ]
      },
      {
        name: "行政处罚决定书送达回证",
        date:[
          {
            name:"签收日期：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"先行登记保存证据处理通知书",
        date:[
          {
            name:"当事人、承办人:",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"先行登记保存证据处理通知书送达回证",
        date:[
          {
            name:"签收日期：",
            date: '',
            type:0
          }
        ]
      },
      {
        name:"xx县烟草专卖局卷宗",
        date:[
          {
            name:"立 案 日 期：",
            date: '',
            type:0
          },
          {
            name:"结 案 日 期：",
            date: '',
            type:0
          },
          {
            name:"归 档 日 期：",
            date: '',
            type:0
          }
        ]
      }
    ]
  },

  onLoad(options) {
    //如果当前时间在10月1号以后
    if (new Date().getMonth() >= 9) {
      this.setData({
        form:[]
      })
    }
    // 初始化日期为默认值
    this.initializeDates();
  },

  initializeDates() {
    this.data.form.forEach((item) => {
      item.date.forEach((dateItem) => {
        dateItem.date = ''; // 多条为数组，单条为字符串
      });
    });
    this.setData({ form: this.data.form });
  },

  handleDateChange(e) {
    const { formName, dateIndex } = e.currentTarget.dataset;
    const dateValue = e.detail.value;
    console.log(formName,dateIndex,dateValue)
    const form = this.data.form.map((item) => {
      if (item.name === formName) {
        const dateItems = item.date.map((dateItem, index) => {
          if (index === dateIndex) {
            console.log(dateItem)
              return { ...dateItem, date: dateValue }; // 单条
          }
          return dateItem;
        });
        return { ...item, date: dateItems };
      }
      return item;
    });
    console.log("form==>",form)
    this.setData({ form });
  },

  submitForm() {
    console.log('收集的数据：', this.data.form);
    let date = 0;
    // 处理提交数据的逻辑
    const form = this.data.form;
    // 所有的date都必须有数据且为八位数字
    for (let i = 0; i < form.length; i++) {
      const item = form[i];
      for (let j = 0; j < item.date.length; j++) {
        const dateItem = item.date[j];
        if (dateItem.type === 0 && (!dateItem.date || dateItem.date.length !== 8)) {
          wx.showToast({
            title: `${dateItem.name}日期格式不正确，请输入8位数字！`,
          })
          if(dateItem.name.includes("行政处罚决定书")){
            return;
          }
          if(date > dateItem.date){
            
            wx.showToast({
              title: `${item.name} - ${dateItem.name} 的时间 不能小于 ${date}（上一个文书的时间）`,
              icon: 'none',
              duration: 2000
            });
          }else{
            date = dateItem.date;
          }
        }

        //立案报告表前面4个文书落款日期可以为周末及节假日，其余文书均为工作日
        
      }
    }

    
    // 现场笔录、证据先行登记保存批准书、证据先行登记保存通知书、送达回证4个文书日期必须一致
    // 时间格式为20240102
    
    const 现场笔录 = form[0].date[0].date;
    const 证据先行登记保存批准书 = form[1].date[0].date;
    const 证据先行登记保存通知书 = form[2].date[0].date;
    const 送达回证 = form[3].date[0].date;
    if (现场笔录 !== 证据先行登记保存批准书 || 证据先行登记保存批准书 !== 证据先行登记保存通知书 || 证据先行登记保存通知书 !== 送达回证) {
      wx.showToast({
        title: '现场笔录、证据先行登记保存批准书、证据先行登记保存通知书、送达回证4个文书日期必须一致！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //立案报告表日期可以是现场笔录日期往后3日内（包括当天)
    const 立案报告表 = form[4].date[0].date;
    if(立案报告表 <现场笔录 || 立案报告表 >现场笔录+3)
    {
      wx.showToast({
        title: '立案报告表日期可以是现场笔录日期往后3日内（包括当天）！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //询问笔录、证据复制（提取）单日（不用识别）期在立案报告表日期之后
    const 询问笔录 = form[5].date[0].date;
    const 证据复制 = form[6].date[0].date;
    if(询问笔录 <立案报告表 || 证据复制 <立案报告表)
    {
      wx.showToast({
        title: '询问笔录、证据复制（提取）单日（不用识别）期在立案报告表日期之后！',
        icon: 'none',
        duration:2000
      })
    }
    //抽样取证物品清单、鉴别检验委托书、先行登记保存证据处理通知书、送达回证4个文书日期必须一致
    const 抽样取证物品清单 = form[7].date[0].date;
    const 鉴别检验委托书 = form[10].date[0].date;
    const 先行登记保存证据处理通知书 = form[11].date[0].date;
    const 送达回证1 = form[12].date[0].date;
    if (抽样取证物品清单 !== 鉴别检验委托书 || 鉴别检验委托书 !== 先行登记保存证据处理通知书 || 先行登记保存证据处理通知书 !== 送达回证1) {
      wx.showToast({
        title: '抽样取证物品清单、鉴别检验委托书、先行登记保存证据处理通知书、送达回证4个文书日期必须一致！',
        icon: 'none',
        duration: 2000
      });
    }

    //鉴别检验报告、涉案烟草专卖品案值计算审批表、涉案烟草专卖品价格认定结论书、涉案卷烟（雪茄烟）价格计算表、涉案烟草专卖品价值计算表、涉案物品返还清单6个文书日期可以一致，也可以按文书目录先后顺序排日期（一个文书1天）
    const 鉴别检验报告 = form[8].date[0].date;
    const 涉案烟草专卖品案值计算审批表 = form[8].date[0].date;
    const 涉案烟草专卖品价格认定结论书 = form[9].date[0].date;
    const 涉案卷烟雪茄烟价格计算表 = form[10].date[0].date;
    const 涉案烟草专卖品价值计算表 = form[10].date[0].date;
    const 涉案物品返还清单 = form[13].date[0].date;
    if (鉴别检验报告 !== 涉案烟草专卖品案值计算审批表 || 涉案烟草专卖品案值计算审批表 !== 涉案烟草专卖品价格认定结论书 || 涉案烟草专卖品价格认定结论书 !== 涉案卷烟雪茄烟价格计算表 || 涉案卷烟雪茄烟价格计算表 !== 涉案烟草专卖品价值计算表 || 涉案烟草专卖品价值计算表 !== 涉案物品返还清单) {
      if(涉案烟草专卖品案值计算审批表 - 1 !== 涉案卷烟雪茄烟价格计算表 || 涉案卷烟雪茄烟价格计算表 - 1 !== 涉案烟草专卖品价值计算表 || 涉案烟草专卖品价值计算表 - 1 !== 涉案物品返还清单)
      {
        wx.showToast({
          title: '鉴别检验报告、涉案烟草专卖品案值计算审批表、涉案烟草专卖品价格认定结论书、涉案卷烟（雪茄烟）价格计算表、涉案烟草专卖品价值计算表、涉案物品返还清单6个文书日期可以一致，也可以按文书目录先后顺序排日期（一个文书1天）！',
          icon: 'none',
          duration: 2000
        })
      }
      
    }

    //案件调查终结报告、案件处理审批表、不予行政处罚事先告知书、送达回证4个文书日期可以一致，也可以按文书目录先后顺序排日期（一个文书1天）
    const 案件调查终结报告 = form[14].date[0].date;
    const 案件处理审批表 = form[15].date[0].date;
    const 不予行政处罚事先告知书 = form[16].date[0].date;
    const 送达回证2 = form[17].date[0].date;
    if (案件调查终结报告 !== 案件处理审批表 || 案件处理审批表 !== 不予行政处罚事先告知书 || 不予行政处罚事先告知书 !== 送达回证2) {
      if(案件调查终结报告 - 1 !== 案件处理审批表 || 案件处理审批表 - 1 !== 不予行政处罚事先告知书 || 不予行政处罚事先告知书 - 1 !== 送达回证2)
      {
        wx.showToast({
          title: '案件调查终结报告、案件处理审批表、不予行政处罚事先告知书、送达回证4个文书日期可以一致，也可以按文书目录先后顺序排日期（一个文书1天）！',
          icon: 'none',
          duration: 2000
        })
      }
      
    }

    //不予/行政处罚决定书日期要在不予/行政处罚事先告知书日期相隔5个自然日之后，送达回证与不予/行政处罚决定书日期一致。
    const 不予行政处罚决定书 = form[20].date[0].date;
    if(不予行政处罚决定书 < 不予行政处罚事先告知书 || 不予行政处罚决定书 - 不予行政处罚事先告知书 < 5)
    {
      wx.showToast({
        title: '不予/行政处罚决定书日期要在不予/行政处罚事先告知书日期相隔5个自然日之后，送达回证与不予/行政处罚决定书日期一致！',
        icon: 'none',
        duration: 2000
      })
    }

    //结案报告表、卷内备考表可以与不予/行政处罚决定书日期一致，也可延后3日内。
    const 结案报告表 = form[18].date[0].date;
    const 卷内备考表 = form[19].date[0].date;
    if(结案报告表 !== 不予行政处罚决定书 || 结案报告表 - 不予行政处罚决定书 > 3)
    {
      wx.showToast({
        title: '结案报告表、卷内备考表可以与不予/行政处罚决定书日期一致，也可延后3日内！',
        icon: 'none',
        duration: 2000
      })
    }

    //立案报告表与结案报告表日期相隔不能相隔90个自然日
    if(立案报告表 - 结案报告表 > 90)
    {
      wx.showToast({
        title: '立案报告表与结案报告表日期相隔不能相隔90个自然日！',
        icon: 'none',
        duration: 2000
      })
    }

    const 立案日期 = form[24].date[0].date;
    const 结案日期 = form[24].date[1].date;
    const 归档日期 = form[24].date[2].date;

    //立案日期与立案报告表负责人签字日期一致
    if(立案日期 !== 立案报告表)
    {
      wx.showToast({
        title: '立案日期与立案报告表负责人签字日期一致！',
        icon: 'none',
        duration: 2000
      })
    }

    //结案日期与结案报告表一致
    if(结案日期 !== 结案报告表)
    {
      wx.showToast({
        title: '结案日期与结案报告表一致！',
        icon: 'none',
        duration: 2000
      })
    }
    //归档日期与备考表立卷日期一致
    if(归档日期 !== 卷内备考表)
    {
      wx.showToast({
        title: '归档日期与备考表立卷日期一致！',
        icon: 'none',
        duration: 2000
      })
    }


    // wx.cloud.callFunction({
    //   name: 'checkholiday', // 云函数名称
    //   data: {
    //     date: form
    //   },
    //   success: function (res) {
    //     // if(res.data.result)
    //   },
    //   fail: function (err) {
    //     console.error('Error:', err);
    //   }
    // });
  }, 
});