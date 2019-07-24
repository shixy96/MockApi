const OPEN_CLASS_TYPE = 9;
const SELF_COURSE = 1;
const teacher_catalogId = "5b7fd723eb3a9440d057467d";
const zk_catalogId = "5b7fd723eb3a9440d057467b";
const bachelorEnglish_catalogId = "5b7fd723eb3a9440d057467c";

module.exports = app => ({
  "get /search": app.model.catalog.search,

  "get /recommend": app.model.catalog.recommend,

  "get /getCatalogDetail": ctx => {
    if (ctx.request.query.type == OPEN_CLASS_TYPE) {
      ctx.body = app.model.catalog.catalogDetail.live;
    } else {
      ctx.body = app.model.catalog.catalogDetail.common;
    }
  },

  "get /getCampaignDetail": ctx => {
    const { catalogId } = ctx.request.query;
    let shareGainInfo = {
      shareGainAmount: 100000,
      discountAmount: 50000
    };
    let campaignData = {};
    if (catalogId == teacher_catalogId) {
      campaignData = app.model.catalog.campaignDetail.teacher;
    } else if (catalogId == zk_catalogId) {
      campaignData = app.model.catalog.campaignDetail.zhukao;
    } else if (catalogId == bachelorEnglish_catalogId) {
      campaignData = app.model.catalog.campaignDetail.english;
    }
    ctx.body = {
      hr: 0,
      message: "",
      data: {
        catalogId: catalogId,
        shareGainInfo: shareGainInfo,
        ...campaignData
      }
    };
  },

  "get /getCourseDetail": ctx => {
    const { source } = ctx.request.query;
    let data =
      source === SELF_COURSE
        ? app.model.catalog.courseDetail.courseDetail
        : {
            networkCourseResTree:
              app.model.catalog.courseDetail.networkCourseResTree,
            ...app.model.catalog.courseDetail.courseDetail
          };
    ctx.body = {
      hr: 0,
      message: "",
      data: data
    };
  }
});
