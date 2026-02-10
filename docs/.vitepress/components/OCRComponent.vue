<template>
  <div class="example-image">
    <el-image style="width: 300px; height: 300px" src="/images/Alipay-Hold-Fund.png" fit="contain" />
    <span class="demonstration">上传 “持有” 页面截图</span>
  </div>
  <div class="title">
    <h4>免费使用 · 不限用量</h4>
  </div>
  <div class="guide">
    <a href="https://mp.weixin.qq.com/s/g3GieBBTdl61L1hVjh3ZlA" target="_blank" rel="noopener noreferrer">使用教程</a>
  </div>
  <div class="upload-button">
    <el-upload
      v-model:file-list="fileList"
      multiple
      accept="image/*"
      :show-file-list="false"
      :on-change="handleOnChange"
    >
      <el-button type="primary" style="margin-right: 10px" :loading-icon="Eleme" :loading="isLoading"
        >上传图片</el-button
      >
    </el-upload>
    <el-button type="success" @click="copyContent" style="margin-left: 10px">复制内容</el-button>
  </div>

  <div style="overflow-x: auto" v-if="allFunds.length > 0">
    <el-table :data="allFunds" border size="small" stripe="false">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="fundCode" label="基金代码" />
      <el-table-column prop="fundName" :min-width="250" label="基金名称" />
      <el-table-column prop="holdAmount" label="持有金额" />
      <el-table-column prop="holdReturn" label="持有收益" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import Tesseract from "tesseract.js";
import { Eleme } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus";
import { ocrAlipay } from "../utils/ocr-ali-pay";

const fileList = ref<UploadFile[]>([]);
const isLoading = ref(false);

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

    isLoading.value = true;
    await startOCR(file);
    isLoading.value = false;
  }
}

async function startOCR(file: UploadFile) {
  if (!file.raw) return;

  const {
    data: { text },
  } = await Tesseract.recognize(file.raw, "eng+chi_sim", {
    logger: (m) => {
      if (m.status === "recognizing text") {
      }
    },
  });

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
  justify-content: center;
  margin: 10px 0;
}
.guide {
  text-align: center;
  margin: 10px 0 15px 0;
  cursor: pointer;
}
</style>
