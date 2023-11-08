<template>
  <!-- Início do template -->
  <div>
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" dense :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="400" fixed-header :footer-props="{ 'items-per-page-options': [-1] }">
      <!-- Botão solicitar plurima -->
      <template v-slot:top>
        <div class="d-flex">
          <!-- Primeira barra de ferramentas -->
          <v-toolbar flat class="mb-8">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="seuMetodoAqui">Solicitar plúrima</v-btn>
          </v-toolbar>

          <!-- Segunda barra de ferramentas (barra de busca) -->
          <v-toolbar flat class="mb-8">
            <v-spacer></v-spacer>
            <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
              v-model="search"></v-text-field>
            <v-icon @click="initializeTable" color="accent" large class="mr-2">mdi-update</v-icon>
          </v-toolbar>
        </div>
      </template>



      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="#a07aff" :size="26"
              @click="getCalculoById(item)" class="mr-2" :disabled="loadingTableCalculos">
              mdi-eye-outline
            </v-icon>
          </template>
          <span>Visualizar Cálculo</span>
        </v-tooltip>

      </template>

      <template v-slot:[`item.DATA_CRIACAO`]="{ item }">
        {{ convertData(item.DATA_CRIACAO) }}
      </template>

      <template v-slot:[`item.DESCRICAO`]="{ item }">
        <v-chip :color="getColorStatus(item)" dark>
          {{ item.DESCRICAO }}
        </v-chip>
      </template>


    </v-data-table>

    <loading ref="loading" />
    <snack ref="snackbar" />
  </div>
</template>




<script>
import config from "@/config/store";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";
import dayjs from "dayjs";
export default {
  name: "cardProduto",
  components: { loading, snack },
  props: {
    plurimas: Array,
    loading: Boolean,
  },

  data() {
    return {
      search: null,
      idProcesso: null,
      dialog: false,
      aprove: null,
      tituloDialogAprovcacao: null,
      corpoDialogAprovcacao: null,
      loadingTable: true,
      idUsuario: config.user().ID_USUARIO,
      headers: [
        { text: "Ações", value: "actions", sortable: false },
        { text: "PROCESSO", value: "NUMERO_PROCESSO" },
        { text: "CRIACAO", value: "DATA_CRIACAO" },
        { text: "SOLICITANTE", value: "NOME_SOLICITANTE" },
        { text: "CLIENTE", value: "NOME_CLIENTE" },
        { text: "FASE", value: "FASE" },
        { text: "TRABALHO", value: "TRABALHO" },
        { text: "ETAPA", value: "ETAPA" },
        { text: "STATUS", value: "DESCRICAO" },
        { text: "TIME PLURIMAS", value: "TIME_PLURIMAS" },
      ],
      PlurimasV: this.plurimas,
      selecao: [],
    };
  },
  watch: {
    plurimas(newValue) {
      this.PlurimasV = newValue;
    },
    loading(newValue) {
      this.loadingTable = newValue;
    },
  },

  methods: {


    initializeTable() {
      this.Empreitadas = [];
      this.$emit("initializeTable");
    },
    selectedRow(item) {
      this.selecao = item.slice();
    },

    convertData(item) {
      if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
        return dayjs(item.replace("T", " ").replace("Z", "")).format(
          "YYYY-MM-DD"
        );
      }
    },

    getColorStatus(item) {
      if (item.DESCRICAO == "EM ABERTO") return "green lighten-4";
      if (item.DESCRICAO == "EM ANÁLISE") return "brown lighten-4";
      if (item.DESCRICAO == "AGUARDANDO CLIENTE") return "orange lighten-4";
      if (item.DESCRICAO == "AGUARDANDO SOLICITANTE") return "green lighten-4";
      if (item.DESCRICAO == "AGUARDANDO OP") return "green lighten-4";
      if (item.DESCRICAO == "EM ANDAMENTO") return "green lighten-4";
      if (item.DESCRICAO == "CANCELADA") return "green lighten-4";
      if (item.DESCRICAO == "RECUSADA") return "green lighten-4";
      if (item.DESCRICAO == "FINALIZADA") return "green lighten-4";
    },
  },
};
</script>
