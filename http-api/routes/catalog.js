const OPEN_CLASS_TYPE = 9;
const MATERIAL_TYPE = 10;
const CONTENT_BAG = 12;
const SELF_COURSE = 1;
const TEACHER_WRITTEN_EXAM_CATALOG_ID = "5d8f3309bd940705f81cc636";
const TEACHER_REVIEW_CATALOG_ID = "5be15f1820a06054f0045237";
const ZK_CATALOG_ID = "5b7fd723eb3a9440d057467b";
const BACHELOR_ENGLISH_CATALOG_ID = "5b7fd723eb3a9440d057467c";

const apiService = require("../service/apiService.js")

const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /search": async ctx => {
    let { query, headers } = ctx.request;
    let data = await apiService.catalog.search(query, headers);
    ctx.body = data;
  },

  "get /recommend": app.model.catalog.recommend,

  "get /getCatalogDetail": ctx => {
    if (ctx.request.query.type == OPEN_CLASS_TYPE) {
      ctx.body = app.model.catalog.catalogDetail.live;
    } else if (ctx.request.query.type == MATERIAL_TYPE) {
      ctx.body = app.model.catalog.catalogDetail.material;
    } else if (ctx.request.query.type == CONTENT_BAG) {
      ctx.body = app.model.catalog.catalogDetail.contentBag;
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
    if (catalogId == TEACHER_REVIEW_CATALOG_ID) {
      campaignData = app.model.catalog.campaignDetail.teacherReview;
    } else if (catalogId == TEACHER_WRITTEN_EXAM_CATALOG_ID) {
      campaignData = app.model.catalog.campaignDetail.teacherIntroduce;
    } else if (catalogId == ZK_CATALOG_ID) {
      campaignData = app.model.catalog.campaignDetail.zhukao;
    } else if (catalogId == BACHELOR_ENGLISH_CATALOG_ID) {
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
