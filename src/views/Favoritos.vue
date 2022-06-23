<template>
  <v-container>
    <v-dialog v-model="dialogEliminar" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          ¿Esta seguro de remover este favorito?
        </v-card-title>
        <v-card-text>Esta accion no es reversible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-3" text @click="dialogEliminar = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-3 white--text" @click="removerFavorito">
            Si, eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row wrap>
      <v-col v-for="gato in gatosArray" :key="gato.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto my-2" max-width="374">
          <v-img height="250" :src="gato.image.url"></v-img>

          <v-card-actions>
            <v-btn
              color="red darken-3"
              text
              @click="mostrarDialogEliminar(gato.id)"
            >
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
      gatoId: 0,
      dialogEliminar: false,
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
    mostrarDialogEliminar(id) {
      this.dialogEliminar = true;
      this.gatoId = id;
    },
    removerFavorito() {
      axios
        .delete(`favourites/${this.gatoId}`)
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
