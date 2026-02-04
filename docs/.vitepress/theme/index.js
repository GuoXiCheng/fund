import DefaultTheme from 'vitepress/theme'
import './custom.css'
import OCRComponent from '../components/OCRComponent.vue'


export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('OCRComponent', OCRComponent);
    }
}