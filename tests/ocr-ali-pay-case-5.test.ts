import { describe, it, expect } from "vitest";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";
import fs from "fs";

describe("ocrAlipay function", () => {
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
});
