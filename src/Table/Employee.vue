<template>
  <div class="result__row" :class="modClass">
    <div class="result__td result__td--empty"></div>
    <div class="result__td result__td--name">{{ employee.name }}</div>
    <div class="result__td">{{ employee.total.percents }}%</div>
    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'summ'
      })"
    >
      {{ employee.total.incoming }}
    </div>

    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'fail'
      })"
    >
      {{ employee.incoming.fail }}
    </div>
    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'not_waste'
      })"
    >
      {{ employee.incoming.not_waste }}
    </div>
    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'waste_success'
      })"
    >
      {{ employee.incoming.waste_success }}
    </div>
    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'waste_fail'
      })"
    >
      {{ employee.incoming.waste_fail }}
    </div>

    <div
      class="result__td"
      @click="openModal({
        call_type: 'incoming',
        call_status: 'success'
      })"
    >
      {{ employee.incoming.success }}
    </div>
    <div
      class="result__td"
      @click="openModal({
        call_type: 'outgoing',
        call_status: 'success'
      })"
    >
      {{ employee.outgoing.success }}
    </div>
  </div>
</template>

<script>
  import openModal from '@/utils/modal.js';

  export default {
    name: "Employee",
    props: {
      employee: {
        type: Object,
        required: true
      }
    },
    computed: {
      modClass() {
        const percents = this.employee.total.percents;

        if (percents <= 5) return 'result__row--success';
        if (percents > 5 && percents < 10) return 'result__row--warning';
        return 'result__row--fail'
      }
    },
    methods: {
      openModal(info) {
        openModal({
          context: this,
          params: {
            ...info,
            id: this.employee.id,
            name: this.employee.name,
            type: 'user'
          }
        });
      }
    }
  }
</script>
