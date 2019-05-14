<template>
  <div id="app">
    <p v-if="!cities">Загрузка...</p>
    <div v-else>
      <!-- <Header /> -->
      <Filters />
      <Table />
    </div>
  </div>
</template>

<script>
  import 'normalize.css';
  // import Header from '@/components/Header.vue';
  import Filters from '@/components/Filters.vue';
  import Table from '@/Table/Table.vue';

  export default {
    name: "app",
    components: {
      // Header,
      Filters,
      Table,
    },
    computed: {
      cities() {
        return this.$store.state.cities;
      }
    },
    mounted() {
      this.$store.dispatch("loadCities");
    }
  };
</script>

<style lang="less">
  @import './static/less/vars.less';

  @font-face {
    font-family: 'Stolzl';
    font-style: normal;
    font-weight: 400;
    src:
      local('Stolzl'), local('Stolzl-Regular'), url('/fonts/stolzl-regular.otf') format('opentype')
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    width: 1328px;
    margin: 0 auto;
  }

  img {
    max-height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    font-size: 12px;
    font-family: 'Stolzl', sans-serif;
  }

  .page-header {
    background-color: @bg-color;
    padding: 10px 0;
  }

  .page-header__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .user__img-wrapper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
  }

  .user__img {
    display: block;
    margin: 0 auto;
  }

  .user__name {
    margin: 0 24px 0 8px;
  }
</style>
