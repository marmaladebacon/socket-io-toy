<template>
  <div class="home">
    <h2>Admin</h2>
    <div>
      <button v-on:click="adminChange">MakeChange</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Admin extends Vue {
  adminChange() {
    this.$store.dispatch("randomAdminChange");
  }
}
</script>
