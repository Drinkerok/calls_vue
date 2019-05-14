<template>
  <div class="filter-item">
    <p class="filter-item__label">Дата</p>
    <date-picker
      class="filter-item__input"
      v-model="date"
      range
      :shortcuts="false"
      :lang="lang"
      :format="'DD-MM-YYYY'"
      :custom-formatter="formatDate"
      @change="confirmHandler"
    />
  </div>
</template>

<script>
  export default {
    name: "Date",
    components: {
      DatePicker: () => import('vue2-datepicker')
    },
    data() {
      return {
        date: this.$store.getters.getFilterDates,
        lang: 'ru',
        shortcuts: false
      }
    },
    methods: {
      formatDate(d) {
        console.log(d);
        return d;
      },
      confirmHandler(date) {
        this.$store.commit({
          type: 'filterDate',
          date
        });
      }
    },
  }
</script>

<style lang="less">
  .filters {
    .mx-datepicker-range {
      width: auto;
      padding: 0;
    }

    .mx-input-append {
      padding: 0;
    }
    .mx-input-append:not(.mx-clear-wrapper) {
      display: none;
    }

    .mx-datepicker {
      font: inherit;
    }

    .mx-input {
      border: none;
      padding: 0 20px 0 4px;
      box-shadow: none;
      font-size: 12px;
      line-height: 1.25;
      height: auto;
    }
  }
</style>