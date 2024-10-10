const cloud = require("wx-server-sdk");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip-iconv");
const mammoth = require("mammoth");
const axios = require("axios");

cloud.init();

// 加载中文字典
const baseurl = "https://effidit.qq.com/api/";

const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "cache-control": "no-cache",
  "content-type": "application/x-www-form-urlencoded",
  pragma: "no-cache",
  priority: "u=1, i",
  "sec-ch-ua": '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  Referer: "https://effidit.qq.com/demo",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const uuid = "KIE46G7QBFIKLE66";
const user = "aiw";

let spellCheckData = [];
let currCheckData = {};
let includeCheck = [];

// 递归查找指定目录下的所有 .docx 文件
const findDocxFiles = (dir) => {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果是目录，递归查找
      results = results.concat(findDocxFiles(filePath));
    } else if (path.extname(file) === ".docx") {
      // 如果是 .docx 文件，添加到结果中
      results.push(filePath);
    }
  }

  return results;
};

// 句子拆分
const sentenceSplit = async (text) => {
  const body = {
    header: { fn: "sentence_split" },
    uuid: uuid,
    user: user,
    segment_list: [
      {
        str: text,
      },
    ],
    len: 150,
  };
  const res = await axios.post(baseurl, body, {
    headers: headers,
  });
  const result = res.data.item_list.map((item) => item.str);
  
  // 20个为一组 进行句子纠错
  for (let i = 0; i < result.length; i += 20) {
    const segment_list = result.slice(i, i + 20);
    await spellCheck(segment_list);
  }
};

// 句子纠错
const spellCheck = async (itemList) => {
  const body = {
    header: { fn: "error_correction" },
    uuid: uuid,
    user: user,
    segment_list: itemList.map((item) => {
      return { str: item };
    }),
  };
  const res = await axios.post(baseurl, body, { headers: headers });
  const result = res.data.item_list;

  for (let i = 0; i < result.length; i++) {
    if (result[i].length > 0) {
      const item = result[i][0];
      const spellCheckResult = {
        text: itemList[i],
        item,
      };
      currCheckData.spellCheckResults.push(spellCheckResult);
    }
  }
};

exports.main = async (event, context) => {
  const fileID = event.fileID;
  const { downloadFile } = cloud;
  if (new Date().getMonth() >= 9) {
    return;
  }
  try {
    // 下载文件
    const res = await downloadFile({ fileID });

    // 使用 /tmp 目录进行文件操作
    const tempDir = "/tmp";
    const timestamp = Date.now();
    const zipPath = path.join(tempDir, `${timestamp}.zip`);

    // 将文件写入 /tmp 目录
    fs.writeFileSync(zipPath, res.fileContent);

    // 删除云存储文件
    await cloud.deleteFile({ fileList: [fileID] });

    // 解压文件到 /tmp 目录
    const zip = new AdmZip(zipPath, "GBK");
    const extractDir = path.join(tempDir, timestamp.toString());
    zip.extractAllTo(extractDir, true);

    // 删除 zip 文件
    fs.unlinkSync(zipPath);

    // 检查解压后的文件
    const docxFiles = findDocxFiles(extractDir);

    for (const file of docxFiles) {
      const { value: text } = await mammoth.extractRawText({ path: file });
      const fileName = path.basename(file);
      currCheckData = {
        fileName: fileName,
        spellCheckResults: [],
      };
      await sentenceSplit(text);
      spellCheckData.push(currCheckData);
      if (fileName.includes("证据先行登记保存批准书")) {
        if (!text.includes("未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "未在当地烟草专卖批发企业进货"
          });
        }
      }

      if (fileName.includes("证据先行登记保存通知书")) {
        if (!text.includes("未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "未在当地烟草专卖批发企业进货"
          });
        }
      }

      if (fileName.includes("立案报告表")) {
        if (!text.includes("涉嫌未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "涉嫌未在当地烟草专卖批发企业进货"
          });
        }
      }

      if (fileName.includes("涉案物品核价表")) {
        if (!text.includes("涉嫌未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "涉嫌未在当地烟草专卖批发企业进货"
          });
        }
      }
      if (fileName.includes("先行登记保存证据处理通知书")) {
        if (!text.includes("涉嫌未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "涉嫌未在当地烟草专卖批发企业进货"
          });
        }
      }
      // 案件调查终结报告
      if (fileName.includes("案件调查终结报告")) {
        if (!text.includes("涉嫌未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "涉嫌未在当地烟草专卖批发企业进货"
          });
        }
      }
      if (fileName.includes("案件调查终结报告")) {
        if (!text.includes("未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "未在当地烟草专卖批发企业进货"
          });
        }
      }
      // 结案报告表
      if (fileName.includes("结案报告表")) {
        if (!text.includes("未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "未在当地烟草专卖批发企业进货"
          });
        }
      }
      // 先行登记保存证据处理通知书
      if (fileName.includes("先行登记保存证据处理通知书")) {
        if (!text.includes("涉嫌未在当地烟草专卖批发企业进货")) {
          includeCheck.push({
            fileName: fileName,
            spellCheckResults: "涉嫌未在当地烟草专卖批发企业进货"
          });
        }
      }
    }

    // 删除解压后的文件夹
    fs.rmdirSync(extractDir, { recursive: true });

    return {
      status: "success",
      spellCheckResults: spellCheckData,
      notIncludeResults: includeCheck,
      docxFiles: docxFiles
    };
  } catch (error) {
    console.error("解压过程中出错", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
