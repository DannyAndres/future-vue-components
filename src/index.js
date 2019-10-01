import Datepicker from "./Datepicker.vue";

export default {
    install(Vue, options) {
    Vue.component("future-datepicker", Datepicker);
    }
};