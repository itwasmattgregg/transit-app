<template>
  <div class="home">
    <div class="w-full bg-gray-400">
      <img
        src="../assets/juan-encalada-6mcVaoGNz1w-unsplash.jpg"
        class="object-cover h-64 w-full"
      />
    </div>
    <!-- Make this a selector component -->
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import busSelect from "../components/busSelect.vue";

@Component({
  components: {
    busSelect
  },
  computed: {
    ...mapState(["routes", "directions", "stops"])
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
  onChanged(value: string) {
    this.$store.dispatch("fetchStops", {
      routeId: this.selectedRoute,
      directionId: this.selectedDirection
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
