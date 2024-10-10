// pages/index/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  onTapButton() {
    // 处理中
    wx.showLoading({
      title: '处理中',
    });
    const that = this;
    wx.chooseMessageFile({
      count: 1, // 选择文件的数量
      type: 'file', // 文件类型
      success(res) {
        const tempFilePath = res.tempFiles[0].path;
        
        // 上传文件到云存储
        wx.cloud.uploadFile({
          cloudPath: `uploads/${Date.now()}_${res.tempFiles[0].name}`, // 云端文件名
          filePath: tempFilePath, // 本地文件路径
          success: function (uploadRes) {
            console.log('上传成功', uploadRes.fileID);
            
            // 调用云函数进行解压处理
            wx.cloud.callFunction({
              name: 'docxCheck', // 云函数名称
              data: {
                fileID: uploadRes.fileID, // 传递文件ID
              },
              success: function (res) {
                console.log('识别完成', res.result.spellCheckResults);
                const resultList = res.result.spellCheckResults.map(fileResult => {
                  fileResult.spellCheckResults = fileResult.spellCheckResults.map(result => {
                    const beforeError = result.text.slice(0, result.item.source.offset);
                    const errorText = result.text.slice(result.item.source.offset, result.item.source.offset + result.item.source.len);
                    const afterError = result.text.slice(result.item.source.offset + result.item.source.len);
                    const rightText = result.item.target_list?.length > 0 && result.item.target_list[0].str.trim().length > 0 ?  result.item.target_list[0].str : null;
                    let changeText = "";
                    const types = result.item.types;

                    if(types[0] == 0){
                      changeText += "【错误】";
                    }else{
                      changeText += "【警告】";
                    }

                    if(types[1] == 0){
                      changeText += `建议将 "${errorText}" 替换为 "${rightText}"`;
                    }else if(types[1] == 1){
                      changeText += `建议插入 "${rightText}" 在 "${errorText}" 前`;
                    }else if(types[1] == 2){
                      changeText += `建议删除 "${errorText}"`;
                    }
                    return {
                      ...result,
                      beforeError,
                      errorText,
                      afterError,
                      rightText,
                      changeText
                    };
                  });
                  return fileResult;
                });
                that.setData({
                  resultList: res.result.spellCheckResults
                });
                wx.hideLoading();
              },
              fail: function (err) {
                console.error('Error:', err);
                wx.hideLoading();
              }
            });
          },
          fail: function (err) {
            console.error('上传失败', err);
            wx.hideLoading();
          }
        });
      },
      fail(err) {
        console.error('选择文件失败', err);
        wx.hideLoading();
      }
    });
  },
});
