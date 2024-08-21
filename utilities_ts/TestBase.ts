import{test as baseTest} from "@playwright/test";

interface TestDataOrder {
  username: string;
  password: string;
  productName: string;
}
export const customTest = baseTest.extend<{testDataOrder:TestDataOrder}>({
  testDataOrder: {
    username: "mariotest@gmail.com",
    password: "Qatester1309",
    productName: "ADIDAS ORIGINAL",
  },
});
