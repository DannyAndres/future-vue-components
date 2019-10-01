import Datepicker from "./Datepicker.vue";

// Main Scss File
import '@/assets/scss/main.scss';

// Animations
import 'animate.css';

export default {
    // eslint-disable-next-line
    install(Vue, options) {
    Vue.component("future-datepicker", Datepicker);
    }
};