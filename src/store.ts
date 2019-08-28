import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Provider } from "@/types/Provider";

Vue.use(Vuex);

interface IStore {
  providers: Provider[];
}

const SET_PROVIDERS = "SET_PROVIDERS";

const store = new Vuex.Store({
  state: {
    providers: [] as Provider[]
  },
  mutations: {
    [SET_PROVIDERS](state, payload: Provider[]) {
      state.providers = payload;
    }
  },
  actions: {
    fetchProviders({ commit }) {
      axios
        .get("http://svc.metrotransit.org/nextrip/providers?format=json")
        .then(function(response) {
          // handle success
          commit(SET_PROVIDERS, response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
});

export { store, IStore };
