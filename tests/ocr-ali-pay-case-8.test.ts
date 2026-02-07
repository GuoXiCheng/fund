import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 8", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case8.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "025832",
        fundName: "天弘中证电网设备主题指数A",
        holdAmount: 4060.68,
        holdReturn: 60.68,
      },
      {
        fundCode: "007466",
        fundName: "华泰柏瑞中证红利低波动ETF联接A",
        holdAmount: 8961.3,
        holdReturn: 137.77,
      },
      {
        fundCode: "110018",
        fundName: "易方达增强回报债券B",
        holdAmount: 20186.09,
        holdReturn: 307.07,
      },
      {
        fundCode: "007992",
        fundName: "华夏中证全指证券公司ETF联接A",
        holdAmount: 6198.51,
        holdReturn: 98.51,
      },
      {
        fundCode: "021142",
        fundName: "华夏港股通央企红利ETF联接A",
        holdAmount: 5751.03,
        holdReturn: 151.03,
      },
    ]);
  });
});
