<template>
  <div class="main bg-gray-200">
    <Card
      :user="{
        avatar_url: 'https://i.pinimg.com/originals/39/ec/15/39ec15a87824a1bdd57484e6a5459593.jpg',
        name: 'emily rudd'
      }"
      :background_url="'https://i.pinimg.com/originals/54/ce/a7/54cea70579cfefc972a4cbf67f92ea59.jpg'"
    >
      <span slot="title">This is a title</span>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
      </span>
    </Card>
  </div>
</template>

<script>
import './index.js';
import Card from './Card.vue';
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
    Card,
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