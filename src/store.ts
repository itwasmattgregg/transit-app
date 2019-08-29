import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Route from "@/models/Route";
import RouteResponse from "./models/RouteResponse";
import PropertyNormalizerUtility from "./utils/PropertyNormalizerUtility";
import DirectionResponse from "./models/DirectionResponse";
import Direction from "./models/Direction";
import StopResponse from "./models/StopResponse";
import Stop from "./models/Stop";

Vue.use(Vuex);

interface IStore {
  routes: Route[];
  directions: Direction[];
  stops: Stop[];
}

const SET_ROUTES = "SET_ROUTES";
const SET_DIRECTIONS = "SET_DIRECTIONS";
const SET_STOPS = "SET_STOPS";

const store = new Vuex.Store<IStore>({
  state: {
    routes: [],
    directions: [],
    stops: []
  },
  mutations: {
    [SET_ROUTES](state, payload: Route[]) {
      state.routes = payload;
    },
    [SET_DIRECTIONS](state, payload: Direction[]) {
      state.directions = payload;
    },
    [SET_STOPS](state, payload: Stop[]) {
      state.stops = payload;
    }
  },
  actions: {
    fetchRoutes({ commit }) {
      axios
        .get("http://svc.metrotransit.org/nextrip/routes?format=json")
        .then(function(response) {
          // handle success
          const routes: RouteResponse = new RouteResponse(
            PropertyNormalizerUtility.normalize(response)
          );
          commit(SET_ROUTES, routes.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    fetchDirections({ commit }, routeId) {
      axios
        .get(
          `http://svc.metrotransit.org/nextrip/directions/${routeId}?format=json`
        )
        .then(function(response) {
          // handle success
          const directions: DirectionResponse = new DirectionResponse(
            PropertyNormalizerUtility.normalize(response)
          );
          commit(SET_DIRECTIONS, directions.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    fetchStops({ commit }, { routeId, directionId }) {
      axios
        .get(
          `http://svc.metrotransit.org/nextrip/stops/${routeId}/${directionId}?format=json`
        )
        .then(function(response) {
          // handle success
          const stops: StopResponse = new StopResponse(
            PropertyNormalizerUtility.normalize(response)
          );
          commit(SET_STOPS, stops.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
});

export { store, IStore };
