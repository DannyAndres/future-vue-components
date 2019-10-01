<template>
  <div v-if="show" id="datepicker-modal" class="animated bg-semi-75 fadeIn fixed inset-0 w-full h-screen antialiased font-sans">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div v-if="background" class="bg-cover bg-center h-56 p-4" :style="'background-image: url('+background_url+')'">
              <div class="flex justify-end">
                <svg @click="close(0)" class="cursor-pointer h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="uppercase tracking-wide flex flex-row w-full justify-between items-center text-sm font-bold text-gray-700">
                <svg @click="previousMonth()" class="leftArrow -mb-1 cursor-pointer h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/>
                </svg>
                <span @click="day_view = !day_view" class="title cursor-pointer">
                  <span v-if="day_view">{{ current_month.format }} </span>
                  <span>{{ current_year.format }}</span>
                </span>
                <svg @click="nextMonth()" class="rightArrow -mb-1 cursor-pointer h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
                </svg>
              </p>
            </div>
            <div v-if="day_view" class="flex justify-around p-4 border-t border-gray-300 text-gray-500">
              <span class="font-light w-1/12 flex justify-center items-center" v-for="(day, day_number) in days_of_week" v-bind:key="day_number">
                {{ day }}
              </span>
            </div>
            <div v-if="day_view" class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div class="flex justify-around py-1 text-sm" v-for="(week, week_number) in days_of_month" v-bind:key="week_number">
                <span @click="chooseDay(day)" :class="(isCurrentDay(day) ? 'bg-'+color+'-400 font-black text-white rounded-lg' : 'font-normal› text-gray-700')" class="p-1 cursor-pointer w-1/12 flex justify-center items-center" v-for="(day, day_number) in week" v-bind:key="day_number">
                  {{ day }}
                </span>
              </div>
            </div>
            <div v-if="!day_view" class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div class="flex justify-around py-2 text-sm" v-for="(month_by_four, months_number) in months_of_year" v-bind:key="months_number">
                <span @click="chooseMonth((month_by_four_number+1)+(months_number*4))" :class="(isCurrentMonth((month_by_four_number+1)+(months_number*4)) ? 'text-'+color+'-600 font-black rounded-lg' : 'font-normal text-gray-700')" class="w-1/12 cursor-pointer flex justify-center items-center" v-for="(month, month_by_four_number) in month_by_four" v-bind:key="month_by_four_number">
                  {{ month }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.js';
import moment from 'moment';
export default {
  props: {
    color: {
      type: String,
      default: "indigo",
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
    background: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    background_url: {
      type: String,
      default: 'https://www.xtrafondos.com/wallpapers/montanas-en-bosque-minimalista-flat-3306.jpg'
    },
  },
  data() {
    return {
      day_view: true,
      today: moment(),
      current_month: {
        format: moment().format('MMMM'),
        moment: moment()
      },
      current_year: {
        format: moment().format('YYYY'),
        moment: moment()
      },
      days_of_week: [
        moment().day(1).format('dd'),
        moment().day(2).format('dd'),
        moment().day(3).format('dd'),
        moment().day(4).format('dd'),
        moment().day(5).format('dd'),
        moment().day(6).format('dd'),
        moment().day(0).format('dd')
      ]
    }
  },
  created() {
  },
  methods: {
    close(time) {
      function animateCSS(element, animationName, callback) {
          const node = document.querySelector(element)
          node.classList.add('animated', animationName)

          function handleAnimationEnd() {
              node.classList.remove('animated', animationName)
              node.removeEventListener('animationend', handleAnimationEnd)

              if (typeof callback === 'function') callback()
          }

          node.addEventListener('animationend', handleAnimationEnd)
      }
      if(time) {
        animateCSS('#datepicker-modal', 'fadeOut', () => {
          this.$emit('close');
        });
      } else {
        setTimeout(() => {
          animateCSS('#datepicker-modal', 'fadeOut', () => {
            this.$emit('date',this.today.format('DD/MM/YYYY'));
            this.$emit('close');
          });
        }, 300);
      }
    },
    nextMonth() {
      if(this.day_view) {
        this.current_month = {
          format: this.current_month.moment.clone().add(1,'month').format('MMMM'),
          moment: this.current_month.moment.add(1,'month')
        }
        this.current_year = {
          format: this.current_year.moment.clone().add(1,'month').format('YYYY'),
          moment: this.current_year.moment.add(1,'month')
        }
      } else {
        this.current_year = {
          format: this.current_year.moment.clone().add(1,'year').format('YYYY'),
          moment: this.current_year.moment.add(1,'year')
        }
      }
    },
    previousMonth() {
      if(this.day_view) {
        this.current_month = {
          format: this.current_month.moment.clone().subtract(1,'month').format('MMMM'),
          moment: this.current_month.moment.subtract(1,'month')
        }
        this.current_year = {
          format: this.current_year.moment.clone().subtract(1,'month').format('YYYY'),
          moment: this.current_year.moment.subtract(1,'month')
        }
      } else {
        this.current_year = {
          format: this.current_year.moment.clone().subtract(1,'year').format('YYYY'),
          moment: this.current_year.moment.subtract(1,'year')
        }
      }
    },
    isCurrentDay(day) {
      if(day != ' ') {
        var long_day = ((day).toString().length == 1 ? '0'+(day) : (day).toString());
        var moment_date = moment(this.current_year.format+'-'+this.current_month.moment.format('MM')+'-'+long_day);
        return moment_date.isSame(this.today, 'd');
      } else {
        return false;
      }
    },
    isCurrentMonth(month) {
      return parseInt(this.current_month.moment.format('MM')) == month;
    },
    chooseMonth(month) {
      var long_month = ((month).toString().length == 1 ? '0'+(month) : (month).toString());
      var moment_date = moment(this.current_year.format+'-'+long_month+'-01');
      this.current_month = {
        format: moment_date.clone().format('MMMM'),
        moment: moment_date
      }
      this.day_view = !this.day_view;
    },
    chooseDay(day) {
      var long_day = ((day).toString().length == 1 ? '0'+(day) : (day).toString());
      var moment_date = moment(this.current_year.format+'-'+this.current_month.moment.format('MM')+'-'+long_day);
      this.today = moment_date;
      document.getElementById('datepicker-modal').classList.add('fadeOut');
      this.close();
    },
  },
  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden');
      }
      document.querySelector('body').classList.remove('overflow-hidden');
    }
  },
  computed: {
    days_of_month() {
      var date = new Date(this.current_year.moment.format('Y'), this.current_month.moment.format('M') - 1, 1);
      var result = [];
      while (date.getMonth() == this.current_month.moment.format('M') - 1) {
        var day_number = 0;
        if(date.getDay() == 0) {
          day_number = 7;
        } else {
          day_number = date.getDay();
        }
        if(result.length < day_number - 1) {
          result.push(' ');
        } else {
          result.push(date.getDate());
          date.setDate(date.getDate() + 1);
        }
      }
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
      );
      result = chunk(result,7);
      var last_week_length = result[result.length - 1].length
      for (let i = last_week_length; i < 7; i++) {
        result[result.length - 1].push(' ');
      }
      return result;
    },
    months_of_year() {
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
      );
      return chunk(moment.monthsShort(), 4);
    }
  }
};
</script>

<style lang="scss" scoped>
  .leftArrow:hover, .rightArrow:hover {
    transform: scale(1.15);
  }
  .leftArrow, .rightArrow {
    transition: all 200ms;
    transform-origin: 50% 50%;
  }
  .title:hover {
    transform: scale(1.02);
  }
  .title {
    transition: all 200ms;
    transform-origin: 50% 50%;
  }
  .bg-semi-75 {
    background-color: rgba(#1A202C, 0.75) !important;
  }
</style>