
<template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="pt-3 elevation-12 mt-16 mx-auto" elevation="12" shaped>
          <v-form @submit.prevent="gerarTokenRecSenha">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="transparent"
              max-width="calc(100% - 60px)"
            >
              <v-toolbar color="#7E57C2" line-width="2" padding="16" dark shaped>
                <v-toolbar-title class="mx-auto">
                  Solicitar Nova Senha
                </v-toolbar-title>
                <v-spacer></v-spacer>
  
                <v-btn
                  elevation="24"
                  color="transparent"
                  fab
                  dark
                  absolute
                  center
                  right
                  @click="emitEvent"
                >
                  <v-img
                    lazy-src="../../assets/BernPlurimas_logo.png"
                    max-height="30"
                    max-width="30"
                    src="../../assets/BernPlurimas_logo.png"
                  ></v-img>
                </v-btn>
              </v-toolbar>
            </v-sheet>
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="text"
                color="#7E57C2"
                v-model="usuario"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" dark color="#7E57C2" class="ma-1"
                >Solicitar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
      <loading ref="loading" />
      <snack ref="snackbar" />
    </v-layout>
  </template>
      
  <script>
  import axios from "axios";
  import loading from "@/components/shared/loading.vue";
  import snack from "@/components/shared/snackBar.vue";
  
  export default {
    name: "solicitarSenha",
    components: { loading, snack },
    data: () => ({
      usuario: null,
    }),
    methods: {
      emitEvent() {
        this.$emit("statusForm", true);
      },
      gerarTokenRecSenha() {
        this.$refs.loading.dialog = true;
  
        axios({
          method: "post",
          url: "http://192.168.4.45:3005/api.usuarios/v1/recoverpassword",
          data: {
            email: this.usuario,
          },
        })
          .then((result) => {
            this.$refs.loading.dialog = false;
            this.usuario = "";
            this.snackbar = true;
            this.snackbarText = result.data.msg;
  
            this.$refs.snackbar.show({
              message: result.data.msg,
              status: result.data.status,
            });
          })
          .catch((err) => {
            this.$refs.loading.dialog = false;
            this.$refs.snackbar.show({
              message: err.response.data.msg,
              status: true,
            });
          });
      },
    },
  };
  </script> 
  
  <style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  </style>