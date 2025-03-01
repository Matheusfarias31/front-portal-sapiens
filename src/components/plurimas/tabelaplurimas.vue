<template>
  <div>
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="400" fixed-header>
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="pink lighten-2" :size="26" @click="listaReclamantes(item)"
              class="mr-2" :disabled="loadingTable">
              mdi-format-list-numbered
            </v-icon>
          </template>
          <span>Listas de Reclamantes</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="indigo lighten-2" :size="26" @click="showAprova(item)" class="mr-2"
              :disabled="disabeIconAprovavao(item)">
              mdi-check-decagram-outline
            </v-icon>
          </template>
          <span>Aprovar</span>
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
        <v-chip :color="item.COLOR_STATUS" dark>
          {{ item.DESCRICAO }}
        </v-chip>
      </template>
    </v-data-table>
    <plurimaView :idplurima="idplurima" ref="plurimaview" @closePlurimaView="closeDialogPlurimaView()" />
    <listareclamantes :idplurima="idplurima" :numeroprocesso="numeroprocesso" ref="listareclamantes" />

    <formAprovacao :show="dialogAprovacao" :idUsuario="idUsuario"
      @closeAprovacao="dialogAprovacao = false, closeDialogPlurimaView()" :plurimaProp="plurima" />

    <loading ref="loadingdata" />
    <snack ref="snackbar" />
  </div>
</template>

<style scoped>
/* Estilizando o scrollbar no WebKit (Chrome, Safari) */
::-webkit-scrollbar {
  width: 6px;
  /* Largura do scrollbar */
}

::-webkit-scrollbar-track {
  background: #EDE7F6;
  /* Cor de fundo da área do scrollbar não preenchida */
}

::-webkit-scrollbar-thumb {
  background: #B39DDB;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: #B39DDB;
  /* Cor do botão do scrollbar ao passar o mouse por cima */
}
</style>

<script>
import config from "@/config/store";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";
import dayjs from "dayjs";
import axios from "axios";
import plurimaView from "./plurimaView.vue";
import formAprovacao from "./formAprovacao.vue";
import listareclamantes from "./listadereclamantes/dialoglistasreclamantes.vue";

export default {
  name: "tabelaplurimas",
  components: { loading, snack, formAprovacao, plurimaView, listareclamantes },
  props: {
    plurimas: Array,
    loading: Boolean,
  },
  data() {
    return {
      search: null,
      loadingTable: this.loading,
      idplurima: null,
      numeroprocesso: null,
      dialog: false,
      aprove: null,
      tituloDialogAprovcacao: null,
      corpoDialogAprovcacao: null,
      dialogSolicitarProcesso: false,
      rules: [(v) => !!v || "É necessário"],
      rules2: [(v) => v != null || "É necessário"],
      idUsuario: config.user().ID_USUARIO,
      headers: [
        { text: "Ações", value: "actions", sortable: false, align: "center" },
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
      dialogPlurima: false,
      dialogAprovacao: false,
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
    disabeIconAprovavao(item) {
      let disable = true;

      if (item.TIME_PLURIMAS == true && item.DESCRICAO === 'EM ABERTO') {
        disable = false;
      }

      return disable;
    },
    closeDialogPlurimaView() {
      this.$emit("closeViewPlurima");
    },
    async listaReclamantes(item) {
      this.idplurima = item.ID;
      this.numeroprocesso = item.NUMERO_PROCESSO;
      this.$refs.listareclamantes.localIdPlurima = item.ID;
      this.$refs.listareclamantes.localNumeroProcesso = item.NUMERO_PROCESSO;
      this.$refs.listareclamantes.$emit('show-dialog', true);
    },
    async showPlurima(item) {      
      this.$refs.loadingdata.dialog = true;
      this.idplurima = item.ID;
      this.$refs.plurimaview.localIdPlurima = item.ID;      
      this.$refs.plurimaview.$emit('show-dialog', true);      
      this.$refs.loadingdata.dialog = false;
    },
    async showAprova(item) {
      this.$refs.loadingdata.dialog = true;
      await this.getPlurimaID(item.ID);
      this.$refs.loadingdata.dialog = false;
      this.dialogAprovacao = true;
    },
    async getLogStatusPlurima(idPlurima) {
      await axios.get(
        `${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima/${idPlurima}`
      ).then((response) => {
        this.logStatusPlurima = response.data.log;
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    async getAtividadesEtapa(idPlurima, idEtapa) {
      await axios.get(
        `${process.env.VUE_APP_ROOT_API_BASE_URL}atividades/etapas/plurima/${idPlurima}/${idEtapa}`
      ).then((response) => {
        this.detalheEtapa = response.data.result;
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    async getPlurimaID(idPlurima) {
      await axios.get(
        `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${idPlurima}`
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
