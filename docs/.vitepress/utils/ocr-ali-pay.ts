import AlipayFundOutput from "../data/AlipayFundOutput.json";

// 为 AlipayFundOutput 添加索引签名类型
const AlipayFundOutputTyped: { [key: string]: string } = AlipayFundOutput;

const removeWords = ["定投", "更准更省"];

// OCR 常见错误替换表
const ocrErrorMap: [string, string][] = [
  ["侈", "鑫"],
  ["新华泰", "华泰"],
];

export function ocrAlipay(text: string) {
  // 1. 去除所有空格和指定内容
  let processed = text.replace(/\s+/g, "");
  if (removeWords.length) {
    processed = processed.replace(new RegExp(removeWords.join("|"), "g"), "");
  }

  // 2. 替换 OCR 错误
  for (const [error, correct] of ocrErrorMap) {
    processed = processed.replace(new RegExp(error, "g"), correct);
  }

  // 3. 匹配基金数据片段
  const aliPayKeys = Object.keys(AlipayFundOutputTyped);
  const keywords = Array.from(new Set(aliPayKeys.map((key) => key.slice(0, 2))));
  const regex = new RegExp(`(${keywords.join("|")})[^%]*%`, "g");
  const matches = processed.match(regex) || [];
  if (!matches.length) return null;

  // 4. 解析基金数据
  const parsed = parseFundData(matches);
  return parsed
    .map((item) => {
      const fundName = item[0];
      const candidates = aliPayKeys.filter((key) => key.startsWith(fundName));
      if (candidates.length === 1) {
        return {
          fundCode: AlipayFundOutputTyped[candidates[0]],
          fundName,
          holdAmount: cleanNumber(item[1]),
          holdReturn: cleanNumber(item[2]),
        };
      }
      // 多候选时，尝试用额外信息精确匹配
      const extraParts = item.slice(3).filter((part) => !/[+\-%]/.test(part));
      for (const part of extraParts) {
        const cleaned = part.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "");
        if (!cleaned) continue;
        const matched = candidates.find((key) => key.includes(cleaned) || key.endsWith(cleaned.slice(-1)));
        if (matched) {
          return {
            fundCode: AlipayFundOutputTyped[matched],
            fundName: matched,
            holdAmount: cleanNumber(item[1]),
            holdReturn: cleanNumber(item[2]),
          };
        }
      }
      return null;
    })
    .filter((item) => item != null)
    .filter((item) => item.fundCode != null);
}

function parseFundData(data: string[]): string[][] {
  // 给字符串 + 号 和 - 号 前面添加空格
  const result1 = data.map((item) => item.replace(/([+-])/g, " $1"));
  // 给字符串0.00前面添加空格
  const result2 = result1.map((item) => item.replace(/0.00/g, " 0.00"));
  // 给第一个小数点符号，往前找第一个非数字字符（忽略逗号），在这个字符后面添加空格
  const result3 = result2.map((item) => {
    const dotIndex = item.indexOf(".");
    if (dotIndex === -1) {
      return item;
    }

    const beforeDot = item.substring(0, dotIndex);
    // 从小数点前的字符串末尾开始，反向查找第一个非数字且非逗号的字符
    for (let i = beforeDot.length - 1; i >= 0; i--) {
      const char = beforeDot[i];
      if (!/\d|,/.test(char)) {
        // 找到后，在该字符后面插入空格
        const insertIndex = i + 1;
        return beforeDot.substring(0, insertIndex) + " " + beforeDot.substring(insertIndex) + item.substring(dotIndex);
      }
    }

    return item;
  });

  // 找到第一个 + 号 或 - 号，往后找到第一个非数字字符，在这个字符前面添加空格
  const result4 = result3.map((item) => {
    const signIndex = item.search(/[+-]/);
    if (signIndex === -1) {
      return item;
    }

    const sub = item.substring(signIndex + 1);
    // 查找第一个不是数字、逗号或小数点的字符
    const nonDigitMatch = sub.match(/[^0-9,.]/);

    if (nonDigitMatch && nonDigitMatch.index !== undefined) {
      // 计算在原始字符串中插入空格的位置
      const insertIndex = signIndex + 1 + nonDigitMatch.index;
      return item.slice(0, insertIndex) + " " + item.slice(insertIndex);
    }

    return item;
  });

  return result4.map((item) => item.split(" ").filter((part) => part.trim() !== ""));
}

function cleanNumber(str: string): number {
  // 去除加号和逗号
  const cleaned = str.replace(/[+,]/g, "");
  return parseFloat(cleaned);
}
