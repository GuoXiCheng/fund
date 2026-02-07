import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 4", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case4.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "017515",
        fundName: "易方达北证50指数A",
        holdAmount: 3460.34,
        holdReturn: -39.66,
      },
      {
        fundCode: "002301",
        fundName: "兴业短债债券A",
        holdAmount: 26969.1,
        holdReturn: 57.22,
      },
      {
        fundCode: "160632",
        fundName: "鹏华酒指数A",
        holdAmount: 9819.17,
        holdReturn: 37.66,
      },
      {
        fundCode: "007466",
        fundName: "华泰柏瑞中证红利低波动ETF联接A",
        holdAmount: 8890.89,
        holdReturn: 40.28,
      },
      {
        fundCode: "110017",
        fundName: "易方达增强回报债券A",
        holdAmount: 2000.57,
        holdReturn: 11.18,
      },
      {
        fundCode: "007992",
        fundName: "华夏中证全指证券公司ETF联接A",
        holdAmount: 6179.45,
        holdReturn: 79.45,
      },
    ]);
  });
});
