module.exports = app => ({
  "get /history": app.model.purchase.history["v6.3"],

  "get /getOffers": ctx => {
    const { promotionCode } = ctx.request.query;
    let result = ctx.model.purchase.offer.offer;
    if (promotionCode) {
      result.data.push(ctx.model.purchase.offer.promotion);
    }
    ctx.body = result;
  }
});
