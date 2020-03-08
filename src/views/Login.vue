<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="Email"
                    id="email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    :rules="rules.email"
                    :error-messages="errors.email"
                    v-model="form.email"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    :rules="rules.password"
                    :error-messages="errors.password"
                    v-model="form.password"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text to="/register">
                  Create account
                </v-btn>
                <v-btn text to="/forgot-password">
                  Forgot password?
                </v-btn>

                <v-spacer />
                <v-btn
                  :loading="loading"
                  :disabled="loading || !valid"
                  color="primary"
                  @click="submit"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          v => !!v || "E-mail is required",
          v => /\S+@\S+\.\S+/.test(v) || "Invalid email"
        ],
        password: [
          v => !!v || "Password is required",
          v =>
            (v && v.length >= 8) ||
            "Password must be at least 8 characters long"
        ]
      },
      errors: {},
      valid: true,
      loading: false
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    async submit() {
      try {
        this.loading = true;
        await this.login(this.form);

        this.loading = false;
        this.$toast.success("Login successful");
        this.$router.replace({ name: "dashboard" });
      } catch (e) {
        if (e.response.status === 400 && e.response.data.errors) {
          this.errors = e.response.data.errors;
        }
      }
    }
  }
};
</script>
