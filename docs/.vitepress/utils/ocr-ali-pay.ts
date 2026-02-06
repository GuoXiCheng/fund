import AlipayFundOutput from "../data/AlipayFundOutput.json";

// 为 AlipayFundOutput 添加索引签名类型
const AlipayFundOutputTyped: { [key: string]: string } = AlipayFundOutput;

const removeWords = [
  "定投",
  "更准更省",
  "\\|",
  "EDEHERd",
  "僵",
  "对",
  "BEgEse",
  "”",
  "ERARERD",
  "EDaFEEER",
  "便悦纯债基金马",
  "便悦指数基金从",
];

export function ocrAlipay(text: string) {
  // 去除所有空格
  let processed = text.replace(/\s+/g, "");

  // 去除指定内容
  if (removeWords.length > 0) {
    const removePattern = new RegExp(removeWords.join("|"), "g");
    processed = processed.replace(removePattern, "");
  }

  const aliPayKeys = Object.keys(AlipayFundOutputTyped);
  const keywords = Array.from(new Set(aliPayKeys.map((key) => key.substring(0, 2))));

  // 动态生成正则表达式
  const pattern = `(${keywords.join("|")})[^%]*%`;
  const regex = new RegExp(pattern, "g");
  // 匹配指定开头和结尾的内容
  const matches = processed.match(regex) || [];
  if (matches.length === 0) return null;

  const parsed = parseFundData(matches);
  console.log("Parsed Data:", parsed);
  const fundData = parsed
    .map((item) => {
      let fundName = "";
      let holdAmount = "";
      let holdReturn = "";

      switch (item.length) {
        case 5:
          fundName = item[0];
          holdAmount = item[1];
          holdReturn = item[2];
          break;
        case 6:
          fundName = item[0] + item[3];
          holdAmount = item[1];
          holdReturn = item[2];
          break;
        case 7:
          fundName = item[0] + item[1] + item[2];
          holdAmount = item[3];
          holdReturn = item[4];
          break;
        default:
          return null;
      }

      let fundCode = AlipayFundOutputTyped[fundName] || null;
      if (fundCode == null) {
        const fuzzyResult = fuzzySearch(item[0], fundName, aliPayKeys);
        if (fuzzyResult != null) {
          fundCode = fuzzyResult.fundCode;
          fundName = fuzzyResult.fundName;
        }
      }

      return {
        fundCode,
        fundName,
        holdAmount: cleanNumber(holdAmount),
        holdReturn: cleanNumber(holdReturn),
      };
    })
    .filter((item) => item && item.fundCode);
  return fundData;
}

function fuzzySearch(
  prefixName: string,
  fuzzyName: string,
  aliPayKeys: string[],
): { fundCode: string; fundName: string } | null {
  const targetList = aliPayKeys.filter((key) => key.startsWith(prefixName));
  const endMatch = fuzzyName.slice(-1);
  const finalMatch = targetList.find((key) => key.endsWith(endMatch));
  if (finalMatch != null) {
    const fundCode = AlipayFundOutputTyped[finalMatch];
    const fundName = finalMatch;
    return { fundCode, fundName };
  }
  return null;
}

function parseFundData(data: string[]): string[][] {
  return data.map((item) => {
    // 先把所有+前加空格，%前加空格，方便分割
    let s = item.replace(/([+])/g, " $1").replace(/(%)/g, "$1 ");
    // 修改正则：
    // 1. [+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)? - 匹配数字（含千分位和小数）
    // 2. [+-]?\d+(?:\.\d+)?% - 匹配百分数
    // 3. [\u4e00-\u9fa5A-Za-z()]+(?:ETF|联接|混合)?[A-Z]? - 匹配中文/字母/括号组合
    return (
      s.match(
        /[+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[+-]?\d+(?:\.\d+)?%|[\u4e00-\u9fa5A-Za-z()]+(?:ETF|联接|混合)?[A-Z]?/g,
      ) || []
    );
  });
}

function cleanNumber(str: string): number {
  // 去除加号和逗号
  const cleaned = str.replace(/[+,]/g, "");
  return parseFloat(cleaned);
}
