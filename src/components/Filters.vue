<template>
  <div class="filters">
    <div class="container">
      <div class="filters__list">
        <div class="filters__item filters__item--date">
          <Date />
        </div>
        <div class="filters__item filters__item--select">
          <Select />
        </div>
        <div class="filters__item filters__item--select">
          <User />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Date from '@/Filters/Date.vue';
  import Select from '@/Filters/Select.vue';
  import User from '@/Filters/User.vue';

  export default {
    name: "Filters",
    components: {
      Date,
      Select,
      User,
    }
  }
</script>

<style lang="less">
  .filters {
    padding: 24px 0;
  }

  .filters__list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .filters__item {
    margin-right: 56px;

    &--select {
      width: 280px;
    }
  }
  
  .filter-item__input {
    border: none;
    border-bottom: 1px solid #BDBDBD;
    padding: 0 4px;
    line-height: 1.25;

    &:focus {
      outline: none;
    }
  }
</style>