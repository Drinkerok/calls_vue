<template>
  <div
    v-if="users.length > 0"
    class="city"
    :class="{'city--open': isOpen}
  ">
    <div class="result__row">
      <div
        class="result__td result__td--city"
        :class="modClass"
        @click="changeOpen()"
      >{{ city.name }}</div>
      <div class="result__td result__td--empty"></div>
      <div class="result__td">{{ city.total.percents }}%</div>
      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'summ'
        })"
      >
        {{ city.total.incoming }}
      </div>

      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'fail'
        })"
      >
        {{ city.incoming.fail }}
      </div>
      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'not_waste'
        })"
      >
        {{ city.incoming.not_waste }}
      </div>
      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'waste_success'
        })"
      >
        {{ city.incoming.waste_success }}
      </div>
      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'waste_fail'
        })"
      >
        {{ city.incoming.waste_fail }}
      </div>

      <div
        class="result__td"
        @click="openModal({
          call_type: 'incoming',
          call_status: 'success'
        })"
      >
        {{ city.incoming.success }}
      </div>
      <div
        class="result__td"
        @click="openModal({
          call_type: 'outgoing',
          call_status: 'success'
        })"
      >{{ city.outgoing.success }}</div>
    </div>

    <Employee
      v-if="isOpen"
      v-for="employee in users"
      :key="employee.id"
      :employee="employee"
    />
  </div>
</template>

<script>
import openModal from '@/utils/modal.js';
import Employee from '@/Table/Employee.vue';

export default {
  name: "City",
  components: {
    Employee,
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isOpen: false
  }),
  computed: {
    filterName() {
      return this.$store.state.filters.employee;
    },
    users() {
      return this.city.users
        .filter(user => {
          if (!this.filterName) return true;
          return user.name.toUpperCase().indexOf(this.filterName.toUpperCase()) !== -1;
        })
        .sort((a, b) => +b.total.percents - +a.total.percents);
    },
    modClass() {
      const percents = this.city.total.percents;

      if (percents <= 5) return 'result__td--success';
      if (percents > 5 && percents < 10) return 'result__td--warning';
      return 'result__td--fail'
    }
  },
  methods: {
    changeOpen() {
      this.isOpen = !this.isOpen;
    },
    openModal(info) {
      openModal({
        context: this,
        params: {
          ...info,
          id: this.city.id,
          name: this.city.name,
          type: 'department'
        }
      });
    }
  }
}
</script>

<style lang="less">
@import './../static/less/vars.less';

.city {
  margin-bottom: @row-step;
}
</style>
