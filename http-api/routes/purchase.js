module.exports = app => ({
  "get /history": app.model.purchase.history["v6.3"],

  "get /getOffers": ctx => {
    let offerTmp = app.model.purchase.offer.mechanism;
    let result = [];
    let { "catalogIds[]": catalogIds } = ctx.request.query;
    if (typeof catalogIds === "string") {
      catalogIds = [catalogIds];
    }
    catalogIds.forEach(catalogId => {
      let offer = JSON.parse(JSON.stringify(offerTmp));
      offer.id = Date.now();
      offer.catalogId = catalogId;
      result.push(offer);
    });
    result = {
      data: result,
      extraData: null,
      hr: 0,
      message: "成功"
    };
    ctx.body = result;
  }
});
