<template>
  <v-container>
    <v-row wrap>
      <v-col v-for="gato in gatosArray" :key="gato.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto my-2" max-width="374">
          <v-img height="250" :src="gato.image.url"></v-img>

          <v-card-actions>
            <v-btn color="red darken-3" text @click="removerFavorito(gato.id)">
              Remover
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
  data() {
    return {
      gatosArray: [],
    };
  },
  created() {
    this.listarFavoritos();
  },
  methods: {
    listarFavoritos() {
      axios
        .get("favourites?order=Desc")
        .then((respuesta) => {
          this.gatosArray = respuesta.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removerFavorito(id) {
      axios
        .delete(`favourites/${id}`)
        .then(() => {
          this.$store.dispatch("showSnack", {
            message: "Imagen removida de favoritos.",
            color: "green darken-1",
            timer: 2000,
          });
        })
        .catch(() => {
          this.$store.dispatch("showSnack", {
            message: "No se pudo remover de favoritos.",
            color: "red darken-3",
          });
        })
        .finally(() => {
          setTimeout(() => {
            location.reload();
          }, 2500);
        });
    },
  },
};
</script>
