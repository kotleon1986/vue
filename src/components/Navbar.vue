<template>
  <ul>
    <template v-if="!authenticated">
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
    </template>
    <template v-else>
      <li>{{ `${user.firstName} ${user.lastName}` }}</li>
      <li>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </li>

      <li>
        <a href="#" @click.prevent="logout">Logout</a>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      logoutAction: "auth/logout"
    }),

    logout() {
      this.logoutAction();
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
