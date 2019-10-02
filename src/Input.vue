<template>
  <div class="main">
    <div class="w-64">
      <input
        @click="datepicker = true"
        class="animated fadeIn text-gray-700 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="fecha"
        autocomplete="off"
        spellcheck="false"
        readonly="readonly"
        v-model="date"
      >
    </div>
    <datepicker
      :show="datepicker"
      @close="datepicker = false"
      @date="(datepicker) => {date = datepicker}"  
    />
  </div>
</template>

<script>
import './index.js';
import datepicker from './Datepicker.vue';
import moment from 'moment';
// eslint-disable-next-line
require('moment/locale/es');
export default {
  props: {},
  data() {
    return {
      date: '',
      datepicker: false,
    }
  },
  components: {
    datepicker,
  },
  created() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>