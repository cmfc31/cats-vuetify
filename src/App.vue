<template>
  <v-app>
    <!-- GLOBAL SNACKBAR -->
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      :right="true"
      :bottom="true"
      :timeout="snackbar.timer"
    >
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.active = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" @click="goToHome">
        <h1>Cat-Vuetify</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn :to="{ name: 'Favoritos' }" text>
        <span class="mr-2">Favoritos</span>
        <v-icon>fas fa-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["snackbar"]),
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "Principal" });
    },
  },
};
</script>
