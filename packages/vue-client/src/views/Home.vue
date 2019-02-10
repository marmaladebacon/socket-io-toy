<template>
  <div class="home">
    <div>
      <input type="text" v-model="username" placeholder="Enter User Name" />
    </div>
    <div>
      <input type="text" v-model="password" placeholder="Enter Password" />
    </div>
    <div>
      <button v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  username: string = "";
  password: string = "";
  @Prop(Function)
  loginHandler!: Function;

  login() {
    console.log(this.username);
    this.$store
      .dispatch("setupSockets", {
        username: this.username,
        password: this.password
      })
      .then((data: any) => {
        console.log(data);
        if (data.isAdmin) {
          console.log("Pushing admin");
          this.$router.push({ path: "/admin" });
        } else {
          console.log("Pushing broker");
          this.$router.push({ path: "/broker" });
        }
      });
  }

  disconnect() {
    this.$store.dispatch("disconnectSocket");
  }

  get isConnected(): boolean {
    if (this.$store.getters.getSocket) {
      return true;
    }
    return false;
  }
}
</script>
