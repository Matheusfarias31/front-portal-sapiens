<template>  
  <div>
    <plurimaView :show="dialogPlurima" :plurimaProp="plurima"/>
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="380" fixed-header :footer-props="{ 'items-per-page-options': [-1] }">
      <template v-slot:top>
        <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
          <v-toolbar-title>Plúrimas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
            v-model="search"></v-text-field>
          <v-icon @click="initializeTable" large class="mr-2">mdi-update</v-icon>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26" @click="getPlurimaID(item.ID)"
              class="mr-2" :disabled="loadingTable">
              mdi-eye-outline
            </v-icon>
          </template>
          <span>Visualizar Plúrima</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.TIME_PLURIMAS`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-if="!item.TIME_PLURIMAS" v-bind="attrs" v-on="on" color="indigo lighten-2" :size="26" class="mr-2"
              :disabled="loadingTable">
              mdi-account
            </v-icon>
            <v-icon v-if="item.TIME_PLURIMAS" v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26"
              class="mr-2" :disabled="loadingTable">
              mdi-school-outline
            </v-icon>
          </template>
          <span v-if="!item.TIME_PLURIMAS">Solicitante</span>
          <span v-if="item.TIME_PLURIMAS">Time Plúrimas</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.DATA_CRIACAO`]="{ item }">
        {{ convertData2(item.DATA_CRIACAO) }}
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
import axios from "axios";
import urls from "@/config/urls";
import plurimaView from "./plurimaView.vue";

export default {
  name: "cardProduto",
  components: { loading, snack, plurimaView },
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
      dialogSolicitarProcesso: false,
      rules: [(v) => !!v || "É necessário"],
      rules2: [(v) => v != null || "É necessário"],
      idUsuario: config.user().ID_USUARIO,
      headers: [
        { text: "Ações", value: "actions", sortable: false },
        { text: "PROCESSO", value: "NUMERO_PROCESSO" },
        { text: "CRIAÇÃO", value: "DATA_CRIACAO", align: "center" },
        { text: "CLIENTE", value: "NOME_CLIENTE" },
        { text: "FASE", value: "FASE", align: "center" },
        { text: "TRABALHO", value: "TRABALHO", align: "center" },
        { text: "ETAPA", value: "ETAPA", align: "center" },
        { text: "STATUS", value: "DESCRICAO", align: "center" },
        { text: "EXECUÇÃO", value: "TIME_PLURIMAS", align: "center" },
        // { text: "SOLICITANTE", value: "NOME_SOLICITANTE" },
      ],
      PlurimasV: this.plurimas,
      selecao: [],
      plurima: null,
      dialogPlurima: false
    };
  },
  mounted() {
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
    async getPlurimaID(idPlurima) {
      await axios.get(
        `${urls.urlLocal}plurimas/${idPlurima}`
      ).then((response) => {
        this.plurima = response.data.result[0];                
        console.log(this.plurima)
        this.dialogPlurima = true;        
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    initializeTable() {
      this.loadingTable = true;
      this.PlurimasV = [];
      this.$emit("initializeTable");
      this.loadingTable = false;
    },
    selectedRow(item) {
      this.selecao = item.slice();
    },
    convertData2(item) {
      if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
        return dayjs(item.replace("T", " ").replace("Z", "")).format(
          "DD/MM/YYYY"
        );
      }
    },
    convertData(item) {
      if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
        return dayjs(item.replace("T", " ").replace("Z", "")).format(
          "YYYY-MM-DD"
        );
      }
    },
    getColorStatus(item) {
      if (item.DESCRICAO == "EM ABERTO") return "deep-purple lighten-3";
      if (item.DESCRICAO == "EM ANÁLISE") return "orange lighten-3";
      if (item.DESCRICAO == "AGUARDANDO CLIENTE") return "orange lighten-4";
      if (item.DESCRICAO == "AGUARDANDO SOLICITANTE") return "blue-grey lighten-3";
      if (item.DESCRICAO == "AGUARDANDO OP") return "red lighten-3";
      if (item.DESCRICAO == "EM ANDAMENTO") return "brown lighten-3";
      if (item.DESCRICAO == "CANCELADA") return "green lighten-4";
      if (item.DESCRICAO == "RECUSADA") return "green lighten-4";
      if (item.DESCRICAO == "FINALIZADA") return "green lighten-4";
    },
  },
};
</script>
