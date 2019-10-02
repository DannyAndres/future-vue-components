<template>
  <div class="max-w-sm bg-white nunito rounded-lg overflow-hidden shadow-lg">
    <div v-if="type == 'normal'">
      <div v-if="background" class="bg-cover bg-center h-56 p-4" :style="'background-image: url('+background_url+')'">
      </div>
      <div v-if="!background" class="pt-2"></div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          <slot name="title"></slot>
        </div>
        <p class="text-gray-700 text-base">
          <slot></slot>
        </p>
      </div>
      <div v-if="user" class="flex flex-row items-center px-6 py-1">
        <div class="bg-cover shadow-inner mr-3 bg-center h-12 w-12 rounded-full" :style="'background-image: url('+user.avatar_url+')'">
        </div>
        <span class="capitalize text-gray-800">{{ user.name }}</span>
      </div>
      <div v-if="badges.length != 0" class="px-6 py-4">
        <span v-for="(badge, index) in badges" v-bind:key="index" :class="(badge.length - 1 != index ? 'mr-2 bg-'+color+'-100 text-'+color+'-600' : 'bg-'+color+'-100 text-'+color+'-600')" class="inline-block rounded-full px-3 py-1 text-sm font-semibold">{{ badge }}</span>
      </div>
    </div>
    <div v-if="type == 'full-image'" class="bg-cover bg-center" :style="'background-image: linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.4)), url('+background_url+')'">
      <div class="pt-2"></div>
      <div class="px-6 py-4">
        <div class="font-bold text-white text-shadow text-xl mb-2">
          <slot name="title"></slot>
        </div>
        <p class="text-shadow text-gray-100 text-base">
          <slot></slot>
        </p>
      </div>
      <div v-if="user" class="flex flex-row items-center px-6 py-1">
        <div class="text-shadow bg-cover shadow-inner mr-3 bg-center h-12 w-12 rounded-full" :style="'background-image: url('+user.avatar_url+')'">
        </div>
        <span class="text-shadow capitalize text-gray-100 font-bold">{{ user.name }}</span>
      </div>
      <div v-if="badges.length != 0" class="px-6 py-4">
        <span v-for="(badge, index) in badges" v-bind:key="index" :class="(badge.length - 1 != index ? 'mr-2 bg-'+color+'-100 text-'+color+'-600' : 'bg-'+color+'-100 text-'+color+'-600')" class="inline-block rounded-full px-3 py-1 text-sm font-semibold">{{ badge }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import './index.js';
export default {
  props: {
    color: {
      type: String,
      default: "gray",
      validator(x) {
        // tailwind colors
        return [
          "black",
          "gray",
          "red",
          "orange",
          "yellow",
          "green",
          "teal",
          "blue",
          "indigo",
          "purple",
          "pink"].indexOf(x) !== -1;
      }
    },
    type: {
      type: String,
      default: "normal",
      validator(x) {
        // tailwind colors
        return [
          "normal",
          "full-image"
        ].indexOf(x) !== -1;
      }
    },
    background: {
      type: Boolean,
      default: true
    },
    badges: {
      type: Array,
      default: function () { return [] }
    },
    background_url: {
      type: String,
      default: 'https://i.pinimg.com/originals/54/ce/a7/54cea70579cfefc972a4cbf67f92ea59.jpg'
    },
    user: {
      type: Object,
      default: null
    },
  },

  methods: {
    onClick(event) {
      this.$emit("click", event);
    },

    onDoubleClick(event) {
      this.$emit("dblclick", event);
    },
  }
};
</script>

<style lang="scss" scoped>
  .nunito {
    font-family: 'Nunito', sans-serif !important;
  }
  .text-shadow {
    text-shadow: 0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08);
  }
</style>