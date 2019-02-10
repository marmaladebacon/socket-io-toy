<template>
  <div class="home">
    <h2>Broker</h2>
    <div>Text: {{ brokerText }}</div>
    <div>Number: {{ brokerNumber }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Broker extends Vue {
  get brokerText() {
    return this.$store.getters.text;
  }

  get brokerNumber() {
    return this.$store.getters.number;
  }
}
</script>
