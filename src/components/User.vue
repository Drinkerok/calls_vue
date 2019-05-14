<template>
  <div class="user">
    <div class="user__img-wrapper">
      <img src="@/static/img/user.png" alt="Петров Константин" class="user__img">
    </div>
    <p class="user__name">Петров Константин</p>
    <a href="#" class="user__link">Выйти</a>
  </div>
</template>

<script>
  export default {
    name: "User"
  }
</script>

<style lang="less">
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