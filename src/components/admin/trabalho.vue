<template>
  <v-sheet class="py-5 px-10">
    <v-data-table :headers="headerTrabalho" :items="dessertsTrabalho" :search="search" :loading="loadingTable"
      loading-text="Carregando... Aguarde por  favor!" class="text-no-wrap">
      <template v-slot:[`item.Ativo`]="{ item }">
        <v-chip :color="getColorStatus(item.Ativo)" dark>
          {{ formatStatus(item.Ativo) }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
          <v-toolbar-title>Trabalhos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa" single-line hide-details class="mr-6"
            tile></v-text-field>
          <v-icon color="write" large class="mr-2" @click="dialogForm = true">
            mdi-briefcase-plus-outline
          </v-icon>

          <v-dialog v-model="dialogForm" max-width="500px">
            <v-form @submit.prevent="save">
              <v-card>
                <v-card-title>
                  <span class="text-h5">
                    Novo Trabalho
                  </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.NomeTrabalho" label="Nome Trabalho" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn type="submit" color="blue darken-1" text> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>

    </v-data-table>


  </v-sheet>
</template>

<script>
import axios from "axios";

export default {
  name: "trabalho",
  components: {

  },
  data: () => ({
    dialogForm: false,
    dialogDelete: false,
    idSistema: 1017,
    Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
    headerTrabalho: [
      { text: "ID", value: "ID" },
      { text: "TRABALHO", value: "TRABALHO" },

    ],
    dessertsTrabalho: [],
    indexObj: -1,
    snackbar: false,
    snackbarText: "",
    search: "",
    loadingTable: false,
    indexItem: -1,
    editedItem: {
      IdTrabalho: "",
      Trabalho: ""
    },
    defaultItem: {
      IdTrabalho: "",
      NomeTrabalho: ""
    },
    ItemsObjeto: [],

  }),

  created() {
    this.initialize();
  },

  watch: {
    dialogForm(val) {
      val || this.close();
    },
  },
  methods: {
    initialize() {
      this.loadingTable = true;
      this.dessertsClientes = [];

      axios({
        method: "get",
        url: `${process.env.VUE_APP_ROOT_API_BASE_URL}trabalhos`,
      })
        .then((result) => {
          this.loadingTable = false;
          this.dessertsTrabalho = result.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async criarTrabalho() {
      await axios({
        method: "post",
        url: `${process.env.VUE_APP_ROOT_API_BASE_URL}trabalhos`,
        data: {
          trabalho: this.editedItem.NomeTrabalho,
          idSistema: this.idSistema
        },
        headers: {
          Authorization: this.Authorization
        },
      })
        .then((result) => {
          this.snackbar = true;
          this.snackbarText = result.data.msg;
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.msg == "Token expirado!") {
            window.location.href = `${process.env.VUE_APP_ROOT_API_NETWORK_URL}logout`
          }
        });
    },

    save() {
      if (this.indexObj === -1) {
        this.criarTrabalho();
        this.editedItem = Object.assign({}, this.defaultItem);
        this.close();
      }
    },
    close() {
      this.dialogForm = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.indexObj = -1;
        this.initialize();
      });
    },

  },
};
</script>