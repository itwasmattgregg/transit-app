import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Route } from "@/types/Route";

Vue.use(Vuex);

interface IStore {
  routes: Route[];
}

const SET_ROUTES = "SET_ROUTES";

const store = new Vuex.Store({
  state: {
    routes: [] as Route[]
  },
  mutations: {
    [SET_ROUTES](state, payload: Route[]) {
      state.routes = payload;
    }
  },
  actions: {
    fetchRoutes({ commit }) {
      axios
        .get("http://svc.metrotransit.org/nextrip/routes?format=json")
        .then(function(response) {
          // handle success
          commit(SET_ROUTES, response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
});

export { store, IStore };
