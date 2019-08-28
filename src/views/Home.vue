<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState(["providers"])
  }
})
export default class Home extends Vue {
  created(): void {
    this.$store.dispatch("fetchProviders");
  }
}
</script>
