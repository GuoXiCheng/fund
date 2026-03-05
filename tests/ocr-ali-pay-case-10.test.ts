import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 10", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case10.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "012349",
        fundName: "天弘恒生科技ETF联接(QDII)C",
        holdAmount: 9286.28,
        holdReturn: -1193.47,
      },
      {
        fundCode: "012737",
        fundName: "广发创新药产业ETF联接A",
        holdAmount: 9588.21,
        holdReturn: -1092.38,
      },
      {
        fundCode: "012619",
        fundName: "嘉实中证软件服务ETF联接A",
        holdAmount: 8391.3,
        holdReturn: -908.7,
      },
      {
        fundCode: "160632",
        fundName: "鹏华酒指数A",
        holdAmount: 10004.09,
        holdReturn: -1057.42,
      },
      {
        fundCode: "017515",
        fundName: "易方达北证50指数A",
        holdAmount: 4183.79,
        holdReturn: -376.21,
      },
    ]);
  });
});
