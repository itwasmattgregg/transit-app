<template>
  <div class="home">
    <div class="w-full bg-gray-400">
      <img
        src="../assets/juan-encalada-6mcVaoGNz1w-unsplash.jpg"
        class="object-cover h-64 w-full"
      />
    </div>
    <div
      class="flex w-3/4 -mt-10 m-auto p-8 text-left shadow-md rounded-lg controls"
    >
      <div class="flex-1 px-1">
        <bus-select
          :label="'Route'"
          :options="routes"
          v-model="selectedRoute"
        ></bus-select>
      </div>
      <div class="flex-1 px-1">
        <bus-select
          :label="'Direction'"
          :options="directions"
          v-model="selectedDirection"
        ></bus-select>
      </div>
      <div class="flex-1 px-1">
        <bus-select
          :label="'Stop'"
          :options="stops"
          v-model="selectedStop"
        ></bus-select>
      </div>
    </div>
    <div class="flex mx-auto w-3/4 pt-12">
      <departure-list
        :stopId="selectedStop"
        :departures="departures"
      ></departure-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import busSelect from "../components/busSelect.vue";
import departureList from "../components/departureList.vue";

@Component({
  components: {
    busSelect,
    departureList
  },
  computed: {
    ...mapState(["routes", "directions", "stops", "departures"])
  }
})
export default class Home extends Vue {
  created(): void {
    this.$store.dispatch("fetchRoutes");
  }

  get selectedRoute(): string {
    return this.$store.state.selectedRoute;
  }
  set selectedRoute(route: string) {
    this.$store.dispatch("setSelectedRoute", route);
    this.$store.dispatch("fetchDirections");
  }

  get selectedDirection(): string {
    return this.$store.state.selectedDirection;
  }
  set selectedDirection(direction: string) {
    this.$store.dispatch("setSelectedDirection", direction);
    this.$store.dispatch("fetchStops");
  }

  get selectedStop(): string {
    return this.$store.state.selectedStop;
  }
  set selectedStop(stop: string) {
    this.$store.dispatch("setSelectedStop", stop);
    this.$store.dispatch("fetchDepartures");
  }
}
</script>

<style lang="css" scoped>
.controls {
  position: relative;
  background: white;
}
</style>
