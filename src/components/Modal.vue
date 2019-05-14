<template>
  <div class="modal">
    <p class="modal__loading" v-if="!calls">Загрузка...</p>
    <div v-else>
      <p class="modal__name">Все {{ propToString('call_type') }} {{ propToString('call_status') }} {{ getRange }}</p>

      <div class="modal__row">
        <div class="modal__about">
          <div class="modal__header">
            <p>{{ propToString('type') }}</p>
          </div>
          <p class="modal__who">{{ name }}</p>
        </div>

        <div class="modal__info">
          <div class="modal__header">
            <p>Дата</p>
            <p>Номер телефона</p>
            <p>CRM</p>
          </div>

          <div class="call">
            <div class="call__list">
              <div
                class="call__item"
                v-for="item in calls"
              >
                <div class="call__info">
                  <p class="call__date">{{ item.date }}<br>в {{ item.time }}</p>
                  <p class="call__phone">{{ item.phone }}</p>
                  <div class="call__author">
                    <a :href="item.crm.link.src" class="call__author-link" target="_blank">{{ item.crm.link.title }}</a>
                    <p class="call__author-type">{{ item.crm.link.name }}</p>
                  </div>
                </div>
                <audio class="call__audio" :src="item.crm.audio" controls></audio>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pagination :pages="pages" v-model="page" />
    </div>
  </div>
</template>

<script>
import loader from '@/utils/backend.js';
import { API, ModalPropsToString, dateToString } from '@/utils/constants.js';

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export default {
  name: "Modal",
  components: {
    Pagination: () => import('@/components/Pagination.vue')
  },
  props: {
    call_type: {
      type: String,
      required: true
    },
    call_status: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      date: this.$store.getters.getFilterDates,
      calls: null,
      page: 1,
      pages: 0
    }
  },
  computed: {
    getRange() {
      if (!this.date[0]) return '';

      const stringDates = this.date.map(item => new Date(item).toLocaleString("ru", dateOptions));
      return `с ${stringDates[0]} по ${stringDates[1]}`;
    }
  },
  watch: {
    page() {
      this.calls = null;
      this.loadContent();
    }
  },
  methods: {
    loadContent() {
      loader(API.modal, {
        id: this.id,
        type: this.type,
        call_type: this.call_type,
        call_status: this.call_status,
        page: this.page,
        min_date: dateToString(this.date[0]),
        max_date: dateToString(this.date[1])
      })
        .then(data => {
          this.calls = { ...data.response.data };
          this.pages = +data.response.pages;
        })
    },
    propToString(prop) {
      return ModalPropsToString[prop][this[prop]];
    }
  },
  mounted() {
    this.loadContent();
  }
}
</script>

<style lang="less">
.v--modal-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

.modal {
  width: 913px;
  max-height: calc(~"100vh - 100px");
  overflow: auto;
  background-color: #FAFAFA;
}

.modal__name {
  font-size: 20px;
  font-weight: bold;
  padding: 24px;
}

.modal__row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.modal__about {
  width: 20%;
}

.modal__header {
  background-color: #f2f2f2;
  display: flex;
  justify-content: flex-start;
}

.modal__header p {
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  padding: 18px 24px 14px;


  .modal__info & {
    &:nth-child(1) {
      width: 100px;
      flex-shrink: 0;
    }
    &:nth-child(2) {
      width: 175px;
      flex-shrink: 0;
    }
    &:nth-child(3) {
      flex-grow: 1;
    }
  }
}

.modal__who {
  font-size: 14px;
  padding: 16px 24px;
}

.modal__info {
  width: 80%;
}

.modal__loading {
  padding: 20px;
  text-align: center;
}



.call {
  padding: 8px 0;
}

.call__item {
  &:nth-child(2n + 1) {
    background-color: #ffffff;
  }
}

.call__info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.call__date {
  width: 100px;
  flex-shrink: 0;
  padding: 10px 24px;
  color: #828282;
}

.call__phone {
  width: 175px;
  flex-shrink: 0;
  padding: 10px 24px;
  font-size: 13px;
}

.call__author {
  flex-grow: 1;
  padding: 10px 24px;
}

.call__author-link {
  text-decoration: underline;
  color: #0060E2;
  line-height: 17px;
}

.call__author-type {
  font-size: 11px;
  line-height: 14px;
  color: #828282;
}

.call__audio {
  width: calc(~"100% - 48px");
  margin-left: 24px;
}
</style>