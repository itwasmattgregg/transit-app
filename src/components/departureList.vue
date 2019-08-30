<template>
  <div v-if="departures.length > 0" class="flex-auto">
    <h2 class="text-center text-3xl mb-6">
      Upcoming departures from: {{ stopName }}
    </h2>
    <div
      v-for="departure in departures"
      :key="departure.sjsId"
      class="w-full border border-gray-400 bg-white rounded p-4 flex justify-between leading-normal mb-4"
    >
      <div class="mb-2 flex-1">
        <p class="text-sm text-gray-600 flex items-center">
          Departure
        </p>
        <div class="text-gray-900 font-bold text-xl">
          {{ departure.description }}
        </div>
      </div>
      <div class="w-48 px-2 flex items-center justify-center">
        <p class="text-gray-900 leading-none ">{{ departure.departureText }}</p>
      </div>
    </div>
  </div>
  <div v-else class="flex-auto text-center">
    Select a route, direction and stop above to view departure information.
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Departure from "../models/Departure";
import Stop from "../models/Stop";

@Component
export default class DepartureList extends Vue {
  @Prop({ default: () => [] }) readonly departures!: Departure[];
  @Prop(String) readonly stopId!: string;

  get stopName(): string {
    if (!this.$store.state.stops) {
      return "";
    }
    const stops: Stop[] = this.$store.state.stops;

    const foundStop: Stop | undefined = stops.find((stop: Stop) => {
      return stop.value === this.stopId;
    });

    return foundStop ? foundStop.text : "";
  }
}
</script>
