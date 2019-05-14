<template>
  <div class="filter-item">
    <p class="filter-item__label">Сотрудник</p>
    <input
      type="text"
      class="filter-item__input"
      placeholder="ФИО"
      v-model="val"
    />
  </div>
</template>

<script>
  export default {
    name: "User",
    computed: {
      val: {
        get() {
          return this.$store.state.filters.employee;
        },
        set(name) {
          this.$store.commit({
            type: 'filterName',
            name
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>