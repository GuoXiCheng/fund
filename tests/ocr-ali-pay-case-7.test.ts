import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 7", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case7.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "001632",
        fundName: "天弘中证食品饮料ETF联接C",
        holdAmount: 2325.15,
        holdReturn: 32.49,
      },
      {
        fundCode: "007466",
        fundName: "华泰柏瑞中证红利低波动ETF联接A",
        holdAmount: 1349.72,
        holdReturn: 2.15,
      },
      {
        fundCode: "161226",
        fundName: "国投瑞银白银期货(LOF)A",
        holdAmount: 156.38,
        holdReturn: -43.62,
      },
      {
        fundCode: "020398",
        fundName: "中银港股通医药混合C",
        holdAmount: 1430.18,
        holdReturn: -81.14,
      },
    ]);
  });
});
