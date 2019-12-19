const uuidv4 = require("uuid/v4");

let extra_info = [];

const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /getShareInfo": ctx => {
    const { shareId } = ctx.request.query;
    let shareInfo = app.model.x.shareInfo;
    extra_info.forEach(info => shareInfo.push(info))
    let result = shareInfo.find(v => v.id === shareId);
    ctx.body = !result
      ? app.model.fail
      : {
          hr: 0,
          message: "",
          data: result
        };
  },

  "get /share": ctx => {
    const { schoolId, contentId, contentType } = ctx.request.query;
    let shareId = uuidv4();
    let title = "Fake share " + contentId;
    let content = "Fake share content " + contentId;
    let url = "http://m.dev.qingshuxuetang.com/share/route?shareId=" + shareId;
    let img = "https://m.qingshuxuetang.com/qs/assets/img/qsxt-logo@3x.png";
    extra_info.push({
      id: shareId,
      schoolId: schoolId,
      contentId: contentId,
      contentType: contentType,
      createTime: Date.now(),
      referCampaign: "xxxx",
      title: title,
      content: content,
      img: img,
      url: url,
      tags: ["tag1", "tag2"],
      free: true,
      structureInfo: {
        catalogId: "xxx",
        classId: 111,
        courseId: 111,
        knowledgeId: 111
      }
    })
    ctx.body = {
      hr: 0,
      message: "",
      data: {
        title: title,
        content: content,
        url: url,
        img: img
      }
    }
  }
});
