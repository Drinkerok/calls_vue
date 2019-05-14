<template>
  <div class="filter-item">
    <p class="filter-item__label">Филиал</p>
    <v-select
      class="filter-item__input"
      placeholder="В городе"
      :options="cityNames"
      @input="changeHandler"
    ></v-select>
  </div>
</template>

<script>
  export default {
    name: "Select",
    components: {
      'v-select': () => import('vue-select')
    },
    computed: {
      cities() {
        return this.$store.state.cities;
      },
      cityNames() {
        return this.cities.map(city => ({
          value: city.id,
          label: city.name
        }));
      }
    },
    methods: {
      changeHandler(val) {
        this.$store.commit({
          type: 'filterCity',
          city: val
        })
      }
    }
  }
</script>

<style lang="less">
  .filter-item {
    display: flex;
  }

  .filter-item__label {
    flex-shrink: 0;
    align-self: center;
    text-transform: uppercase;
    margin-right: 12px;
  }

  .filter-item__input {
    flex-grow: 1;
  }

  .filters .v-select {
    .dropdown-toggle {
      border: none;
      padding: 0;
      /*border-bottom: 1px solid #BDBDBD;*/
      border-radius: 0;
    }

    .open-indicator {
      display: none;
    }

    input[type=search],
    input[type=search]:focus {
      padding: 0;
      border: none;
      margin: 0;
      line-height: inherit;
    }

    .selected-tag {
      line-height: inherit;
      padding: 0;
      margin: 0;
    }

    .vs__actions {
      padding: 0;
    }

    .dropdown-toggle .clear {
      margin: 0;
      line-height: inherit;
      font-size: 14px;
    }
  }
</style>