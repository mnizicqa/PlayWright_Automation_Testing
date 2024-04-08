const base = require("@playwright/test");

exports.customTest = base.test.extend({
  testDataOrder: {
    username: "mariotest@gmail.com",
    password: "Qatester1309",
    productName: "ADIDAS ORIGINAL",
  },
});
