<template>
  <v-app>
    <v-app-bar fixed dense dark color="indigo white">
      <v-app-bar-nav-icon
        v-if="authenticated"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <template v-if="authenticated">
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-btn text to="/profile">
                <v-icon>mdi-account</v-icon>
                <v-list-item-title class="ml-2">Profile</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item @click="logout">
              <v-btn text to="/profile">
                <v-icon>exit_to_app</v-icon>
                <v-list-item-title class="ml-2">Logout</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn icon to="/login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-if="authenticated"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false
    };
  },
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
