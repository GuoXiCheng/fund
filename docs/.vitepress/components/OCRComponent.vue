<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="progress > 0">识别中... {{ progress }}%</div>
    <div v-if="funds.length">
      <h3>识别结果：</h3>
      <table cellpadding="6">
        <thead>
          <tr>
            <th>基金代码</th>
            <th>基金名称</th>
            <th>持有金额</th>
            <th>持有收益</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in funds" :key="f.fundCode">
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
      <pre>{{ text }}</pre>
    </div>
  </div>
</template>
<script>
import Tesseract from "tesseract.js";
import { ocrAlipay } from "../utils/ocr-ali-pay";
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
      const file = e.target.files[0];
      if (!file) return;

      this.progress = 0;
      this.text = "";
      this.funds = [];

      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng+chi_sim", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            this.progress = Math.round(m.progress * 100);
          }
        },
      });
      const result = ocrAlipay(text);
      if (Array.isArray(result) && result.length) {
        this.funds = result;
      } else {
        this.text = "未识别到有效基金信息";
      }
      this.progress = 100;
    },
  },
};
</script>
