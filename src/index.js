import Datepicker from "./Datepicker.vue";
import Card from "./Card.vue";

// Main Scss File
import './assets/scss/main.scss';

// Animations
import 'animate.css';

export default {
    // eslint-disable-next-line
    install(Vue, options) {
        Vue.component("future-datepicker", Datepicker);
        Vue.component("future-card", Card);
    }
};