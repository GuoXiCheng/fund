import DefaultTheme from 'vitepress/theme'
import './custom.css'
import OCRComponent from '../components/OCRComponent.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('OCRComponent', OCRComponent);
        app.use(ElementPlus);
    }
}