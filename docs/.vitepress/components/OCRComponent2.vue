<template>
  <div class="example-image">
    <el-image style="width: 300px; height: 300px" src="/images/Alipay-Hold-Fund.png" fit="contain" />
    <span class="demonstration">“持有” 页面截图</span>
  </div>
  <div class="title">
    <h3>免费使用 · 不限用量</h3>
  </div>
  <div class="title">
    <a>使用教程</a>
  </div>
  <div class="upload-button">
    <el-upload v-model:file-list="fileList" multiple accept="image/*" :on-change="handleOnChange">
      <el-button type="primary">点击上传</el-button>
      <template #file="{ file }">
        <span>{{ file.name }}</span>
        <el-progress :percentage="progressMap[file.name + '_' + file.size] || 0" />
      </template>
    </el-upload>
  </div>
  <el-button class="copy-button" type="success" v-if="allFunds.length > 0" :onClick="copyContent">复制内容</el-button>
  <div style="overflow-x: auto" v-if="allFunds.length > 0">
    <el-table :data="allFunds" border size="small" :show-header="false">
      <el-table-column type="index" width="30" />
      <el-table-column prop="fundCode" />
      <el-table-column prop="fundName" :min-width="250" />
      <el-table-column prop="holdAmount" />
      <el-table-column prop="holdReturn" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Tesseract from "tesseract.js";

import type { UploadFile } from "element-plus";
import { ocrAlipay } from "../utils/ocr-ali-pay";

const fileList = ref<UploadFile[]>([]);
const progressMap = ref<Record<string, number>>({});
const allFunds = ref<
  {
    fundCode: string;
    fundName: string;
    holdAmount: number;
    holdReturn: number;
  }[]
>([]);

async function handleOnChange(file: UploadFile, fileList: UploadFile[]) {
  if (file.status === "ready") {
    const uniqueList = fileList.filter(
      (f, idx, arr) => arr.findIndex((item) => item.name === f.name && item.size === f.size) === idx,
    );
    fileList.length = 0;
    fileList.push(...uniqueList);

    startOCR(file);
  }
}

function getFileKey(file: UploadFile) {
  return `${file.name}_${file.size}`;
}

async function startOCR(file: UploadFile) {
  if (!file.raw) return;

  const key = getFileKey(file);
  progressMap.value[key] = 0;

  const {
    data: { text },
  } = await Tesseract.recognize(file.raw, "eng+chi_sim", {
    logger: (m) => {
      if (m.status === "recognizing text") {
        progressMap.value[key] = Math.round(m.progress * 100);
      }
    },
  });

  progressMap.value[key] = 100;

  const result = ocrAlipay(text);
  if (result != null && Array.isArray(result) && result.length) {
    // 合并后去重
    const merged = [...allFunds.value, ...result];
    const unique = merged.filter((item, idx, arr) => arr.findIndex((f) => f.fundCode === item.fundCode) === idx);
    allFunds.value = unique;
  }
}

function copyContent() {
  if (allFunds.value.length === 0) {
    ElMessage.warning("没有可复制的内容");
    return;
  }

  const rows = allFunds.value.map(
    (f) => `
基金代码: ${f.fundCode}
基金名称: ${f.fundName}
持有金额: ${f.holdAmount}
持有收益: ${f.holdReturn}`,
  );
  const content = [...rows].join("\n");
  copyToClipboard(content);

  ElMessage.success("内容已复制");
}

function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch((err) => {
      ElMessage.error("复制失败");
    });
  } else {
    ElMessage.error("复制失败");
  }
}
</script>

<style scoped>
.example-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
.title {
  text-align: center;
}
.upload-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.copy-button {
  margin-bottom: 10px;
}
</style>
