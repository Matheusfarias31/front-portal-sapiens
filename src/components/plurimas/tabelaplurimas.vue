<template>
  <!-- Início do template -->
  <div>    
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="380" fixed-header :footer-props="{ 'items-per-page-options': [-1] }">
      <template v-slot:top>        
        <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
          <v-toolbar-title>Plúrimas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
            v-model="search"></v-text-field>
          <v-icon @click="initializeTable"  large class="mr-2">mdi-update</v-icon>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="#a07aff" :size="26" @click="getCalculoById(item)" class="mr-2"
              :disabled="loadingTable">
              mdi-eye-outline
            </v-icon>
          </template>
          <span>Visualizar Plúrima</span>
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
import axios from "axios";
import urls from "@/config/urls";

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
      dialogSolicitarProcesso: false,
      rules: [(v) => !!v || "É necessário"],
      rules2: [(v) => v != null || "É necessário"],
      idUsuario: config.user().ID_USUARIO,
      headers: [
        { text: "Ações", value: "actions", sortable: false },
        { text: "PROCESSO", value: "NUMERO_PROCESSO" },
        { text: "CRIAÇÃO", value: "DATA_CRIACAO",align: "center"  },
        { text: "SOLICITANTE", value: "NOME_SOLICITANTE" },
        { text: "CLIENTE", value: "NOME_CLIENTE" },
        { text: "FASE", value: "FASE",align: "center"  },
        { text: "TRABALHO", value: "TRABALHO",align: "center"  },
        { text: "ETAPA", value: "ETAPA",align: "center"  },
        { text: "STATUS", value: "DESCRICAO",align: "center"  },
        { text: "TIME PLURIMAS", value: "TIME_PLURIMAS",align: "center"  },
      ],
      PlurimasV: this.plurimas,
      selecao: [],
      fases: [],
      trabalhos: [],
      clientes: []
    };
  },
  mounted(){
    this.getClientes();
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
    async criarProcesso() {
      

      if (!this.$refs.form.validate()) {
        return;
      }

      this.$refs.loading.dialog = true;
      await axios({
        method: "post",
        url: this.hostApiDigitacao + "processos",
        data: {
          PrazoDevolutiva: this.prazoDevolutiva,
          fase: this.fase.length == 0 ? undefined : this.fase.Id,
          reclamante: this.reclamante,
          periodoDe: this.periodoDe,
          periodoAte: this.periodoAte,
          link: this.link,
          solicitante: this.idUser,
          tipo_solici:
            this.tipoSolicitacao.length == 0
              ? undefined
              : this.tipoSolicitacao.Id,
          processo: this.processo,
          cliente: this.cliente.length == 0 ? undefined : this.cliente.Id,
          obs: this.obs,
          filial: this.filial.length == 0 ? undefined : this.filial.Id,
          idSistema: this.idSistema,
        },
        headers: {
          Authorization: this.Authorization,
        },
      })
        .then((result) => {
          (this.prazoDevolutiva = null),
            (this.fase = null),
            (this.reclamante = null),
            (this.periodoDe = null),
            (this.periodoAte = null),
            (this.link = null),
            (this.tipoSolicitacao = null),
            (this.processo = null),
            (this.cliente = null),
            (this.obs = null),
            (this.filial = null),
            this.reset(),
            (this.dialogSolicitarProcesso = false);

          this.$refs.snackbar.show({
            message: result.data.msg,
            status: result.data.status,
          });
          this.$refs.loading.dialog = false;
          this.initialize();
          this.valid = true;
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.msg == "Token expirado!") {
            window.location.href = "http://192.168.4.45:3011/digitabern/logout";
          }
        });
    },
    async getClientes(){
      await axios({
        method: "get",
        url: urls.urlLocal + "clientes",
      })
        .then((result) => {
          result.data.cliente.forEach((element) => {
            this.clientes.push({
              Id: element.Id,
              cliente: element.NomeCliente,
            });
          });

          console.log(this.clientes);
        })
        .catch((err) => {
          console.log(err);
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
