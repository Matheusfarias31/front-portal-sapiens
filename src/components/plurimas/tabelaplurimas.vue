<template>
  <div>    
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="400" fixed-header :footer-props="{ 'items-per-page-options': [-1] }">
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
            <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26" @click="showPlurima(item)"
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

      <template v-slot:[`item.PRAZO_ENTREGA`]="{ item }">
        <v-chip :color="getColorPrazo(item.PRAZO_ENTREGA)" dark>
          {{ convertData2(item.PRAZO_ENTREGA) }}
        </v-chip>
      </template>

      <template v-slot:[`item.DESCRICAO`]="{ item }">
        <v-chip :color="getColorStatus(item)" dark>
          {{ item.DESCRICAO }}
        </v-chip>
      </template>
    </v-data-table>
    <plurimaView :show="dialogPlurima" :plurimaProp="plurima" :detalheEtapa="detalheEtapa" :logStatus="logStatusPlurima" @closePlurimaView="dialogPlurima = false" />
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
        { text: "PRAZO", value: "PRAZO_ENTREGA", align: "center" },
        { text: "CLIENTE", value: "NOME_CLIENTE" },
        { text: "FASE", value: "FASE", align: "center" },
        { text: "TRABALHO", value: "TRABALHO", align: "center" },
        { text: "ETAPA", value: "ETAPA", align: "center" },
        { text: "STATUS", value: "DESCRICAO", align: "center" },
        { text: "EXECUÇÃO", value: "TIME_PLURIMAS", align: "center" }        
      ],
      PlurimasV: this.plurimas,
      selecao: [],
      plurima: [],
      detalheEtapa: [],
      logStatusPlurima: [],
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
    async showPlurima(item){
      this.$refs.loading.dialog = true;
      await this.getAtividadesEtapa(item.ID, item.ID_ETAPA);
      await this.getPlurimaID(item.ID);
      await this.getLogStatusPlurima(item.ID);
      this.$refs.loading.dialog = false;
      this.dialogPlurima = true;
    },
    async getLogStatusPlurima(idPlurima){      
      await axios.get(
        `${urls.urlLocal}log/status/plurima/${idPlurima}`
      ).then((response) => {         
        this.logStatusPlurima = response.data.log;           
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    async getAtividadesEtapa(idPlurima, idEtapa){
      await axios.get(
        `${urls.urlLocal}atividades/etapas/plurima/${idPlurima}/${idEtapa}`
      ).then((response) => {        
        this.detalheEtapa = response.data.result;          
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    async getPlurimaID(idPlurima) {
      await axios.get(
        `${urls.urlLocal}plurimas/${idPlurima}`
      ).then((response) => {
        this.plurima = response.data.result[0];                
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
      if (item.DESCRICAO == "EM ANDAMENTO") return "indigo lighten-3";
      if (item.DESCRICAO == "CANCELADA") return "green lighten-4";
      if (item.DESCRICAO == "RECUSADA") return "green lighten-4";
      if (item.DESCRICAO == "FINALIZADA") return "green lighten-4";
    },
    getColorPrazo(item) {
      const currentDate = dayjs().startOf('day');
      const givenDate = dayjs(item).startOf('day');
      const marginDate = currentDate.add(5, 'day');

      if (givenDate.isBefore(currentDate)) {
        return "red lighten-2";
      } else if (givenDate.isBefore(marginDate)) {
        return "amber lighten-2"
      } else {
        return "green lighten-2";
      }
    }
  },
};
</script>
