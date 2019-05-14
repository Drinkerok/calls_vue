<template>
  <div class="result">
    <div class="container">
      <div class="result__header">
        <div class="result__row result__row--names">
          <div class="result__td result__td--bdr result__td--info">Общая информация</div>
          <div class="result__td result__td--bdr result__td--missed">Пропущенные</div>
          <div class="result__td result__td--successful">Успешные</div>
        </div>

        <div class="result__row">
          <div class="result__td result__td--left">Филиал</div>
          <div class="result__td result__td--left">Cотрудник ОП</div>
          <div class="result__td"></div>
          <div class="result__td result__td--bdr">Кол-во входящих</div>

          <div class="result__td">Входящие</div>
          <div class="result__td">Неотработанные</div>
          <div class="result__td">Отработанные</div>
          <div class="result__td result__td--bdr">Отработанные не вовремя</div>

          <div class="result__td">Входящие</div>
          <div class="result__td">Исходящие</div>
        </div>
      </div>

      <div class="result__body">
        <City
          v-for="city of cities"
          :key="city.id"
          :city="city"
        />
      </div>
    </div>

    <modals-container />
  </div>
</template>

<script>
  import City from '@/Table/City.vue';

  export default {
    name: "Table",
    components: {
      City,
    },
    computed: {
      cities() {
        return this.$store.getters.getCities;
      }
    }
  }
</script>

<style lang="less">
  @import './../static/less/vars.less';

  @td-count: 10;

  @td1: 140px;
  @td2: 250px;
  @td3: 90px;
  @td4: 100px;

  @td5: 110px;
  @td6: 155px;
  @td7: 135px;
  @td8: 128px;

  @td9: 110px;
  @td10: 110px;

  .result__row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    background-color: @bg-color;

    .result__body & {
      border: @border;
    }

    &--success {
      background-color: #E6F7EE;
    }
    &--warning {
      background-color: #FAFDDC;
    }
    &--fail {
      background-color: #FFF4F4;
    }
  }

  .result__td {
    flex-shrink: 0;
    flex-grow: 0;
    padding: 0 16px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;

    &:nth-child(1) {
      width: @td1;
    }
    &:nth-child(2) {
      width: @td2;
    }
    &:nth-child(3) {
      width: @td3;
    }
    &:nth-child(4) {
      width: @td4;
    }
    &:nth-child(5) {
      width: @td5;
    }
    &:nth-child(6) {
      width: @td6;
    }
    &:nth-child(7) {
      width: @td7;
    }
    &:nth-child(8) {
      width: @td8;
    }
    &:nth-child(9) {
      width: @td9;
    }
    &:nth-child(10) {
      width: @td10;
    }

    &--bdr {
      border-right: @border;
    }
    
    &--left {
      justify-content: flex-start;
      text-align: left;
    }


    .result__header & {
      font-size: 11px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .result__row--names & {
      justify-content: center;
      font-size: 10px;
      border-bottom: @border;
      padding-top: 6px;
      padding-bottom: 6px;

      &--info {
        width: @td1 + @td2 + @td3 + @td4;
        color: @info-color;
      }
      &--missed {
        width: @td5 + @td6 + @td7 + @td8;
        color: @miss-color;
      }
      &--successful {
        width: @td9 + @td10;
        color: @success-color;
      }
    }

    .result__body & {
      padding-top: 10px;
      padding-bottom: 10px;
      justify-content: flex-end;
      min-height: 55px;

      cursor: pointer;

      &:hover {
        background-color: #F1F1F1;
      }

      &--empty {
        cursor: default;
        &:hover {
          background-color: transparent;
        }
      }

      &--city {
        justify-content: flex-start;
        position: relative;
        padding-left: 38px;
        text-align: left;

        &:before {
          content: '';
          position: absolute;
          height: 100%;
          width: 8px;
          top: 0;
          left: 0;
        }

        &:after {
          content: '';
          width: 14px;
          height: 6px;
          position: absolute;
          top: 0;
          left: 15px;
          bottom: 0;
          margin: auto;
          transform-origin: center center;
          background-image: url('/icon_dropdown.svg');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }
      }

      &--name {
        justify-content: flex-start;
        text-align: left;
      }
    }

    .city--open & {
      &--city {
        &:after {
          transform: rotate(-180deg);
        }
      }
    }

    &--success {
      &:before {
        background-color: #1E8A4C;
      }
    }
    &--warning {
      &:before {
        background-color: #D0A715;
      }
    }
    &--fail {
      &:before {
        background-color: #DE5252;
      }
    }
  }


  .result__header {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2),
                0 2px 2px rgba(0, 0, 0, 0.12),
                0 0 2px rgba(0, 0, 0, 0.14);
    margin-bottom: @row-step;
  }
</style>
