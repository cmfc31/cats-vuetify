<template>
  <v-container>
    <v-row wrap>
      <v-col v-for="gato in gatosArray" :key="gato.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto my-2" max-width="374">
          <v-img height="250" :src="gato.url"></v-img>

          <v-card-title>{{
            hasBreed(gato) ? gato.breeds[0].name : "Unknown breed"
          }}</v-card-title>

          <v-card-text v-if="hasBreed(gato)">
            <v-chip
              class="ml-0 mb-2"
              color="indigo darken-2"
              text-color="white"
            >
              {{ hasBreed(gato) ? gato.breeds[0].origin : "" }}
            </v-chip>
            <p>
              {{ hasBreed(gato) ? gato.breeds[0].description : "" }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="marcarFavorito(gato.id)"
            >
              Agregar a favoritos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  created() {
    this.listarGatos();
  },
  data() {
    return {
      nombre: "Martin",
      gatosArray: [],
    };
  },
  methods: {
    marcarFavorito(id) {
      axios
        .post("favourites", {
          image_id: id,
          sub_id: "proycon",
        })
        .then(() => {
          this.$store.dispatch("showSnack", {
            message: "Imagen agregada a favoritos.",
            color: "green darken-1",
          });
        })
        .catch(() => {
          this.$store.dispatch("showSnack", {
            message: "No se pudo agregar a favoritos.",
            color: "red darken-3",
          });
        });
    },
    listarGatos() {
      axios
        .get("images/search?limit=6&page=1&order=Rand")
        .then((respuesta) => {
          this.gatosArray = respuesta.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    hasBreed(gato) {
      return gato.breeds.length > 0 ? true : false;
    },
  },
};
</script>
