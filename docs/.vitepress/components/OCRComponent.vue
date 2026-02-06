<template>
  <img src="/images/Alipay-Hold-Fund.png" alt="OCR识别示例" style="width: 35%" />
  <div>
    <input type="file" @change="onFileChange" accept="image/*" multiple />
    <div v-if="progress > 0">识别中... {{ progress }}%</div>
    <div v-if="funds.length">
      <h3>识别结果：</h3>
      <button class="copy-btn" @click="copyFunds">复制表格内容</button>
      <table cellpadding="6">
        <thead>
          <tr>
            <th>序号</th>
            <th>基金代码</th>
            <th>基金名称</th>
            <th>持有金额</th>
            <th>持有收益</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in funds" :key="f.fundCode">
            <td>{{ funds.indexOf(f) + 1 }}</td>
            <td>{{ f.fundCode }}</td>
            <td>{{ f.fundName }}</td>
            <td>{{ f.holdAmount }}</td>
            <td>{{ f.holdReturn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="text">
      <h3>识别结果：</h3>
      <button class="copy-btn" @click="copyText">复制内容</button>
      <pre>{{ text }}</pre>
    </div>
  </div>
</template>
<script>
import Tesseract from "tesseract.js";
import { ocrAlipay2 } from "../utils/ocr-ali-pay2";
export default {
  data() {
    return {
      progress: 0,
      text: "",
      funds: [],
    };
  },
  methods: {
    async onFileChange(e) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      this.progress = 0;
      this.text = "";
      this.funds = [];
      const allFunds = [];
      const totalFiles = files.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        try {
          const {
            data: { text },
          } = await Tesseract.recognize(file, "eng+chi_sim", {
            logger: (m) => {
              if (m.status === "recognizing text") {
                // 计算总体进度
                const fileProgress = m.progress;
                const overallProgress = ((i + fileProgress) / totalFiles) * 100;
                this.progress = Math.round(overallProgress);
              }
            },
          });

          const result = ocrAlipay2(text);
          if (Array.isArray(result) && result.length) {
            allFunds.push(...result);
          }
        } catch (error) {
          console.error(`处理文件 ${file.name} 时出错:`, error);
          this.text += `文件 ${file.name} 识别失败。\n`;
        }
      }

      if (allFunds.length > 0) {
        this.funds = allFunds;
      } else {
        this.text = this.text || "所有图片中均未识别到有效基金信息";
      }
      this.progress = 100;
    },
    copyFunds() {
      // 组装表格内容为文本
      const rows = this.funds.map(
        (f) => `
基金代码: ${f.fundCode}
基金名称: ${f.fundName}
持有金额: ${f.holdAmount}
持有收益: ${f.holdReturn}`,
      );
      const content = [...rows].join("\n");
      this.copyToClipboard(content);
    },
    copyText() {
      this.copyToClipboard(this.text);
    },
    copyToClipboard(content) {
      if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(content);
      } else {
        // 兼容性处理
        const textarea = document.createElement("textarea");
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      if (this.$toast && this.$toast.success) {
        this.$toast.success("已复制");
      } else {
        // 使用浏览器原生的轻提示（如Toast），如果没有则自定义
        if (window && window.Toastify) {
          window
            .Toastify({
              text: "已复制",
              duration: 1500,
              gravity: "top",
              position: "center",
              backgroundColor: "#4caf50",
            })
            .showToast();
        } else {
          // 简单自定义一个轻提示
          const tip = document.createElement("div");
          tip.innerText = "已复制";
          tip.style.position = "fixed";
          tip.style.top = "20px";
          tip.style.left = "50%";
          tip.style.transform = "translateX(-50%)";
          tip.style.background = "rgba(76,175,80,0.95)";
          tip.style.color = "#fff";
          tip.style.padding = "8px 24px";
          tip.style.borderRadius = "4px";
          tip.style.fontSize = "16px";
          tip.style.zIndex = 9999;
          document.body.appendChild(tip);
          setTimeout(() => {
            tip.style.transition = "opacity 0.5s";
            tip.style.opacity = "0";
            setTimeout(() => document.body.removeChild(tip), 500);
          }, 1200);
        }
      }
    },
  },
};
</script>
<style scoped>
.copy-btn {
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 12px;
  margin-right: 8px;
  transition: background 0.2s;
}
.copy-btn:hover {
  background: #388e3c;
}
/* 移动端表格横向滚动，内容不换行 */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
table {
  white-space: nowrap;
  border-collapse: collapse;
  font-size: 14px;
  margin: 0;
}
th,
td {
  white-space: nowrap;
  padding: 4px 10px;
  font-size: 13px;
}
th {
  font-weight: 500;
}
</style>
