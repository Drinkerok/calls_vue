<template>
  <div class="pagination">
    <ul class="pagination__list" v-if="isShow">
      <li class="pagination__item">
        <button
                type="button"
                class="pagination__button"
                :class="{'pagination__button--disabled': page === 1}"
                @click="changePage(page - 1)"
        >
          <
        </button>
      </li>
      <li class="pagination__item" v-for="item in paginationList">
        <button
          type="button"
          class="pagination__button"
          :class="{
            'pagination__button--active': item.number === page,
            'pagination__button--separator': !item.number
          }"
          @click="changePage(item.number)"
        >
          {{ item.number ? item.number : '...' }}
        </button>
      </li>
      <li class="pagination__item">
        <button
                type="button"
                class="pagination__button"
                :class="{'pagination__button--disabled': page === pages}"
                @click="changePage(page + 1)"
        >
          >
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    model: {
      prop: "page"
    },
    props: {
      pages: {
        type: Number,
        required: true
      },
      page: {
        type: Number,
        required: true
      }
    },
    computed: {
      paginationList() {
        const list = [];

        // pages < 12
        if (this.pages < this.params.step * 2 + 6) {
          this.addMiddle(1, this.pages, list);
        }
        else if (this.page < this.params.step * 2 + 1) {
          this.addMiddle(1, this.params.step * 2 + 4, list);
          this.addEnd(list);
        }
        else if (this.page > this.pages - this.params.step * 2) {
          this.addStart(list);
          this.addMiddle(this.pages - this.params.step * 2 - 2, this.pages + 1, list);
        }
        else {
          this.addStart(list);
          this.addMiddle(this.page - this.params.step, this.page + this.params.step + 1, list);
          this.addEnd(list);
        }

        return list;
      },
      params() {
        return {
          step: 3,
        }
      },
      isShow() {
        return this.pages > 1;
      },
    },
    methods: {
      changePage(newPage) {
        if (newPage < 1 || newPage > this.pages || newPage === this.page) return;
        this.$emit("input", newPage);
      },

      addButton(num = false) {
        return {number: num};
      },
      addStart(list) {
        list.push(this.addButton(1));
        list.push(this.addButton());
      },
      addEnd(list) {
        list.push(this.addButton());
        list.push(this.addButton(this.pages));
      },
      addMiddle(from, to, list) {
        for (let i = from; i <= to; i++) {
          list.push(this.addButton(i));
        }
      }
    }
  }
</script>

<style lang="less">
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 0 24px;
}

.pagination__list {
  display: flex;
  align-items: stretch;
  list-style: none;
  padding: 16px 0 24px;
}

.pagination__item {
  margin: 0 0 0 4px;
}

.pagination__button {
  background-color: transparent;
  border: none;
  padding: 4px 10px;
  line-height: 16px;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &--active {
    cursor: default;
    color: #ffffff;
    background-color: #333333;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &--separator {
    cursor: default;
  }
}
</style>