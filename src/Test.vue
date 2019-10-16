<template>
  <div class="main bg-gray-200">
    <Datepicker
      :minDate="'2019-10-19'"
      :show="true"
      :background="false"
      @close="datepicker = false"
      @date="(datepicker) => {date = datepicker}"
      class="z-50"
    />
  </div>
</template>

<script>
import './index.js';
import Datepicker from './Datepicker.vue';
export default {
  props: {
    // https://i.pinimg.com/originals/54/ce/a7/54cea70579cfefc972a4cbf67f92ea59.jpg
    // https://wallpaperaccess.com/full/203545.jpg
    // https://www.xtrafondos.com/wallpapers/montanas-en-bosque-minimalista-flat-3306.jpg
  },
  data() {
    return {
      date: '',
      datepicker: false,
    }
  },
  components: {
    Datepicker,
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>