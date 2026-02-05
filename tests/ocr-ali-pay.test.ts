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

  it("test case 3", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case3.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "012349",
        fundName: "天弘恒生科技ETF联接(QDII)C",
        holdAmount: 6070.58,
        holdReturn: -389.17,
      },
      {
        fundCode: "012619",
        fundName: "嘉实中证软件服务ETF联接A",
        holdAmount: 6255.67,
        holdReturn: -344.33,
      },
      {
        fundCode: "012737",
        fundName: "广发创新药产业ETF联接A",
        holdAmount: 7948.57,
        holdReturn: -432.03,
      },
      {
        fundCode: "024194",
        fundName: "永赢国证商用卫星通信产业ETF联接A",
        holdAmount: 4911.22,
        holdReturn: -188.78,
      },
      {
        fundCode: "013415",
        fundName: "永赢中证全指医疗器械ETF联接A",
        holdAmount: 8928.96,
        holdReturn: -271.04,
      },
      {
        fundCode: "012724",
        fundName: "国泰中证畜牧养殖ETF联接A",
        holdAmount: 8690.5,
        holdReturn: -239.5,
      },
    ]);
  });

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

  it("test case 5", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case5.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "008189",
        fundName: "国泰中证钢铁ETF联接A",
        holdAmount: 6019.25,
        holdReturn: 529.03,
      },
      {
        fundCode: "023917",
        fundName: "华夏国证自由现金流ETF联接A",
        holdAmount: 5962.15,
        holdReturn: 525.93,
      },
      {
        fundCode: "008279",
        fundName: "国泰中证煤炭ETF联接A",
        holdAmount: 4284.9,
        holdReturn: 351.66,
      },
      {
        fundCode: "012537",
        fundName: "华宝中证细分化工产业主题ETF联接A",
        holdAmount: 7094.04,
        holdReturn: 838.83,
      },
    ]);
  });

  it("test case 6", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case6.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "012364",
        fundName: "广发中证光伏产业指数A",
        holdAmount: 6603.9,
        holdReturn: 1232.68,
      },
      {
        fundCode: "000216",
        fundName: "华安黄金ETF联接A",
        holdAmount: 3579.74,
        holdReturn: 813.32,
      },
    ]);
  });
});
