import { describe, it, expect } from "vitest";

import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 1", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case1.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "009879",
        fundName: "平安低碳经济混合C",
        holdAmount: 6157.81,
        holdReturn: 488.29,
      },
      {
        fundCode: "001538",
        fundName: "摩根科技前沿灵活配置混合A",
        holdAmount: 22964.93,
        holdReturn: 1831.49,
      },
      {
        fundCode: "001630",
        fundName: "天弘中证计算机主题ETF联接C",
        holdAmount: 5259.85,
        holdReturn: 506.94,
      },
      {
        fundCode: "005918",
        fundName: "天弘沪深300ETF联接C",
        holdAmount: 5230.27,
        holdReturn: 603.31,
      },
      {
        fundCode: "011103",
        fundName: "天弘中证光伏产业指数C",
        holdAmount: 5058.12,
        holdReturn: 637.83,
      },
      {
        fundCode: "001593",
        fundName: "天弘创业板ETF联接C",
        holdAmount: 6670.17,
        holdReturn: 1090.65,
      },
      {
        fundCode: "001556",
        fundName: "天弘中证500指数增强A",
        holdAmount: 11682.62,
        holdReturn: 2570.25,
      },
    ]);
  });

  it("test case 2", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case2.txt", "utf-8"));
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
