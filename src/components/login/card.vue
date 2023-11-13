<template>
    <div>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="pt-3 elevation-12 mt-16 mx-auto" elevation="12" shaped>
            <v-form @submit.prevent="login">
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="transparent"
                max-width="calc(100% - 60px)"
              >
                <v-toolbar
                  color="deep-purple lighten-2"
                  line-width="2"
                  padding="16"
                  dark
                  shaped
                >
                  <v-toolbar-title class="mx-auto">
                    Bem-vindo ao Bern Plúrimas!
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
                  >
                    <v-img
                      lazy-src="../../assets/Plurify2_Menu_500x500_Circle.png"
                      max-height="60"
                      max-width="60"
                      src="../../assets/Plurify2_Menu_500x500_Circle.png"
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
                  color="deep-purple lighten-2"
                  v-model="usuario"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  :append-icon="viewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="viewPassword ? 'text' : 'password'"
                  name="password"
                  label="Senha"
                  color="deep-purple lighten-2"
                  v-model="senha"
                  @click:append="viewPassword = !viewPassword"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="emitEvent" class="ma-1" color="grey" plain>
                  Esqueceu a senha?
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" dark color="deep-purple lighten-2" class="ma-1"
                  >Entrar</v-btn
                >
              </v-card-actions>  
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
  
      <loading ref="loading" />
      <snack ref="snackbar" />
    </div>
  </template>
      
  <script>
  import axios from "axios";
  import loading from "@/components/shared/loading.vue";
  import snack from "@/components/shared/snackBar.vue";
  export default {
    name: "login",
    components: {
      loading,
      snack,
    },
    data: () => ({
      viewPassword: false,
      usuario: null,
      senha: null,
      idSistema: [1017],
      ativo: [1],
    }),
    methods: {
      emitEvent() {
        this.$emit("statusForm", false);
      },
      async login() {
        this.$refs.loading.dialog = true;
  
        await axios({
          method: "post",
          url: "http://192.168.4.45:3005/api.usuarios/v1/login",
          data: {
            email: this.usuario,
            senha: this.senha,
            idSistema: this.idSistema,
            ativo: this.ativo,
          },
        })
          .then((result) => {
            this.$refs.loading.dialog = false;
            this.usuario = "";
            this.senha = "";
            localStorage.setItem("tokenSistema_1017", result.data.token);
            this.$router.push({ name: "plurimas" });
          })
          .catch((err) => {
            this.$refs.loading.dialog = false;
            console.log(err.response.data);
            this.$refs.snackbar.show({
              message: err.response.data.msg,
              status: err.response.data.status,
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