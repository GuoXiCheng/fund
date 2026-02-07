import { describe, it, expect } from "vitest";
import fs from "fs";
import { ocrAlipay } from "../docs/.vitepress/utils/ocr-ali-pay";

describe("ocrAlipay function", () => {
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
