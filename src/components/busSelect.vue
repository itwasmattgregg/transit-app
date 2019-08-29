<template>
  <div>
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="grid-state"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-state"
        :disabled="options.length === 0"
        v-model="selected"
        @change="handleChange"
      >
        <option disabled value="">Please select a {{ label }}</option>
        <option
          v-for="option in selectOptions"
          :key="option.value"
          v-bind:value="option.value"
          >{{ option.label }}</option
        >
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Route from "../models/Route";
import Direction from "../models/Direction";
import Stop from "../models/Stop";

interface ISelectOptions {
  label: string;
  value: string;
}

@Component({
  model: {
    prop: "selectedRoute",
    event: "change"
  }
})
export default class busSelect extends Vue {
  selected: String = "";

  @Prop({ default: [] }) readonly options!: any[];
  @Prop(String) readonly label!: string;
  @Prop(String) readonly selectedRoute!: string;

  handleChange() {
    this.$emit("change", this.selected);
  }

  public get selectOptions(): ISelectOptions[] {
    return this.options.map(
      (option: Route | Direction | Stop): ISelectOptions => {
        return option.getSelectOptions();
      }
    );
  }
}
</script>
