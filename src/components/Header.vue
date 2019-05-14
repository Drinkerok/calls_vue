<template>
  <header class="page-header">
    <div class="container">
      <div class="page-header__row">
        <div class="logo">
          <img src="@/static/img/logo.svg" alt="Талан" class="logo__img">
        </div>

        <User />
      </div>
    </div>
  </header>
</template>

<script>
  import User from '@/components/User.vue';

  export default {
    name: 'Header',
    components: {
      User
    }
  }
</script>

<style lang="less">
@import './../static/less/vars.less';

.page-header {
  background-color: @bg-color;
  padding: 10px 0;
}

.page-header__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>