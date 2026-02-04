<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="progress > 0">识别中... {{ progress }}%</div>
    <div v-if="text">
      <h3>识别结果：</h3>
      <pre>{{ text }}</pre>
    </div>
  </div>
</template>
<script>
import Tesseract from "tesseract.js";
export default {
  data() {
    return {
      progress: 0,
      text: "",
    };
  },
  methods: {
    async onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.progress = 0;
      this.text = "";

      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng+chi_sim", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            this.progress = Math.round(m.progress * 100);
          }
        },
      });
      this.text = text;
      this.progress = 100;
    },
  },
};
</script>
