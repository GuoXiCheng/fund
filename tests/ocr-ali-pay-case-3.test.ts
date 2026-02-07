import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
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
});
