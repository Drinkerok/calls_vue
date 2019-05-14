import Vue from "vue";
import Vuex from "vuex";
import loader from '@/utils/backend.js';
import { API, dateToString } from '@/utils/constants.js';
import calculateCities from '@/utils/calculateCities'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: null,
    filters: {
      date: [null, null],
      city: null,
      employee: null
    }
  },
  getters: {
    getCities: state => {
      const filterCity = state.filters.city;
      if (!state.cities) return null;
      return state.cities.filter(city => filterCity ? city.id === filterCity.value : true);
    },
    getFilterDates: state => {
      const date = state.filters.date;
      return date.map(item => item ? new Date(item) : '');
    }
  },
  mutations: {
    saveCities(state, {cities}) {
      state.cities = [...cities];
    },
    filterCity(state, { city }) {
      state.filters.city = city;
    },
    filterName(state, { name }) {
      state.filters.employee = name;
    },
    filterDate(state, { date }) {
      state.filters.date = date.map(item => item);
    }
  },
  actions: {
    loadCities({ state, commit }) {
      loader(API.cities, {
        min_date: dateToString(state.filters.date[0]),
        max_date: dateToString(state.filters.date[1])
      })
        .then(data => data.response.departments.sort((a, b) => a.name > b.name ? 1 : -1))
        .then(cities => calculateCities(cities))
        .then(cities => {
          commit({
            type: 'saveCities',
            cities
          });
        })
        .then(() => setTimeout(() => {
          this.dispatch('loadCities')
        }, 1000))
        .catch(err => alert(err.message));
    }
  }
});
