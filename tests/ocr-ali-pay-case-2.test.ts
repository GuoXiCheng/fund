import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay2 } from "../docs/.vitepress/utils/ocr-ali-pay2";

describe("ocrAlipay function", () => {
  it("test case 2", () => {
    const result = ocrAlipay2(fs.readFileSync("tests/feature/case2.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "002301",
        fundName: "兴业短债债券A",
        holdAmount: 19996.81,
        holdReturn: -3.19,
      },
      {
        fundCode: "010989",
        fundName: "南方中证全指房地产ETF联接E",
        holdAmount: 5012.29,
        holdReturn: 2.75,
      },
      {
        fundCode: "003547",
        fundName: "鹏华丰禄债券",
        holdAmount: 20241.53,
        holdReturn: 145.02,
      },
      {
        fundCode: "012349",
        fundName: "天弘恒生科技ETF联接(QDII)C",
        holdAmount: 5382.67,
        holdReturn: 52.92,
      },
      {
        fundCode: "110018",
        fundName: "易方达增强回报债券B",
        holdAmount: 14150.1,
        holdReturn: 150.1,
      },
      {
        fundCode: "023917",
        fundName: "华夏国证自由现金流ETF联接A",
        holdAmount: 6089.34,
        holdReturn: 89.34,
      },
    ]);
  });
});
