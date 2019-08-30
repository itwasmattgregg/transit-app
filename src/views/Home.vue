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
  selectedRoute: string = "";
  selectedDirection: string = "";
  selectedStop: string = "";

  created(): void {
    this.$store.dispatch("fetchRoutes");
  }

  @Watch("selectedRoute")
  onSelectedRouteChanged(value: string) {
    this.$store.dispatch("fetchDirections", value);
  }

  @Watch("selectedDirection")
  onDirectionChanged(value: string) {
    this.$store.dispatch("fetchStops", {
      routeId: this.selectedRoute,
      directionId: this.selectedDirection
    });
  }

  @Watch("selectedStop")
  onStopChanged(value: string) {
    this.$store.dispatch("fetchDepartures", {
      routeId: this.selectedRoute,
      directionId: this.selectedDirection,
      stopId: this.selectedStop
    });
  }
}
</script>

<style lang="css" scoped>
.controls {
  position: relative;
  background: white;
}
</style>
