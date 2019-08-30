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
import Departure from "./models/Departure";
import DepartureResponse from "./models/DepartureResponse";

Vue.use(Vuex);

interface IStore {
  routes: Route[];
  directions: Direction[];
  stops: Stop[];
  departures: Departure[];
}

const SET_ROUTES = "SET_ROUTES";
const SET_DIRECTIONS = "SET_DIRECTIONS";
const SET_STOPS = "SET_STOPS";
const SET_DEPARTURES = "SET_DEPARTURES";

const store = new Vuex.Store<IStore>({
  state: {
    routes: [],
    directions: [],
    stops: [],
    departures: []
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
    },
    [SET_DEPARTURES](state, payload: Departure[]) {
      state.departures = payload;
    }
  },
  actions: {
    // Called on app load
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
    // Called when route dropdown changes
    fetchDirections({ commit }, routeId) {
      commit(SET_STOPS, []);
      commit(SET_DIRECTIONS, []);
      commit(SET_DEPARTURES, []);

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
    // Called when the directions dropdown changes
    fetchStops({ commit }, { routeId, directionId }) {
      commit(SET_STOPS, []);
      commit(SET_DEPARTURES, []);

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
    },
    fetchDepartures({ commit }, { routeId, directionId, stopId }) {
      axios
        .get(
          `http://svc.metrotransit.org/nextrip/${routeId}/${directionId}/${stopId}?format=json`
        )
        .then(function(response) {
          // handle success
          const departures: DepartureResponse = new DepartureResponse(
            PropertyNormalizerUtility.normalize(response)
          );
          commit(SET_DEPARTURES, departures.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
});

export { store, IStore };
