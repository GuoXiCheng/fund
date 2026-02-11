import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
  it("test case 9", () => {
    const result = ocrAlipay(fs.readFileSync("tests/feature/case9.txt", "utf-8"));
    expect(result).toEqual([
      {
        fundCode: "012537",
        fundName: "华宝中证细分化工产业主题ETF联接A",
        holdAmount: 7196.36,
        holdReturn: 941.15,
      },
      {
        fundCode: "012364",
        fundName: "广发中证光伏产业指数A",
        holdAmount: 6442.19,
        holdReturn: 1070.97,
      },
      {
        fundCode: "000216",
        fundName: "华安黄金ETF联接A",
        holdAmount: 3510.29,
        holdReturn: 743.87,
      },
    ]);
  });
});
