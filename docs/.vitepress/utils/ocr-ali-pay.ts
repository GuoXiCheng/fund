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
  // 去除所有空格
  let processed = text.replace(/\s+/g, "");

  // 去除指定内容
  if (removeWords.length > 0) {
    const removePattern = new RegExp(removeWords.join("|"), "g");
    processed = processed.replace(removePattern, "");
  }

  // 替换常见 OCR 错误
  ocrErrorMap.forEach(([errorChar, correctChar]) => {
    processed = processed.replace(new RegExp(errorChar, "g"), correctChar);
  });

  // 取得所有关键前缀
  const aliPayKeys = Object.keys(AlipayFundOutputTyped);
  const keywords = Array.from(new Set(aliPayKeys.map((key) => key.substring(0, 2))));

  // 动态生成正则表达式
  const pattern = `(${keywords.join("|")})[^%]*%`;
  const regex = new RegExp(pattern, "g");
  // 匹配指定开头和结尾的内容
  const matches = processed.match(regex) || [];
  if (matches.length === 0) return null;

  const parsed = parseFundData(matches);

  const fundData = parsed
    .map((item) => {
      const fundName = item[0];
      const targetList = aliPayKeys.filter((key) => key.startsWith(fundName));

      if (targetList.length == 1) {
        let fundCode = AlipayFundOutputTyped[targetList[0]] || null;

        if (fundCode != null) {
          return {
            fundCode,
            fundName,
            holdAmount: cleanNumber(item[1]),
            holdReturn: cleanNumber(item[2]),
          };
        }
      } else {
        // 从第四个元素开始筛选不包含 + 号、- 号、% 号 的元素
        const extraNameParts = item.slice(3).filter((part) => !/[+\-%]/.test(part));
        // 从 targetList 中找到一个包含 extraNameParts 中任一元素的基金名称
        for (const part of extraNameParts) {
          // 清除 part 中的非字母、数字、中文字符
          const cleanedPart = part.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "");
          if (!cleanedPart) continue;
          const matchedKey = targetList.find((key) => key.includes(cleanedPart) || key.endsWith(cleanedPart.slice(-1)));
          if (matchedKey) {
            let fundCode = AlipayFundOutputTyped[matchedKey] || null;
            if (fundCode != null) {
              return {
                fundCode,
                fundName: matchedKey,
                holdAmount: cleanNumber(item[1]),
                holdReturn: cleanNumber(item[2]),
              };
            }
          }
        }
      }
    })
    .filter((item) => item && item.fundCode);
  return fundData;
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
