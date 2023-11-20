<template>
  <v-sheet class="py-5 mt-4 px-10">
    <v-sheet class="py-5 px-3">
      <v-row class="justify-end">
        <v-btn height="40" @click="dialogSolicitarProcesso = true" dark color="deep-purple lighten-2">
          Solicitar plúrima
          <v-icon right dark> mdi-file-document-plus </v-icon>
        </v-btn>
      </v-row>
    </v-sheet>

    <formSolicitacao :show="dialogSolicitarProcesso" @closeFormSolicitacao="dialogSolicitarProcesso = false, listarPlurimas()"/>

    <v-sheet class="mt-5 py-1 ml-0 px-1 d-flex align-center">
      <v-row cols="15" class="pb-10">
        <v-col cols="15" sm="2">
          <cardStatus :qtd="emAberto" color="deep-purple lighten-3" titulo="Em Aberto" />
        </v-col>
        <v-col cols="15" sm="2">
          <cardStatus :qtd="analise" color="orange lighten-3" titulo="Em Análise" />
        </v-col>
        <v-col cols="15" sm="2">
          <cardStatus :qtd="emAndamento" color="indigo lighten-3" titulo="Em Andamento" />
        </v-col>
        <v-col cols="15" sm="2">
          <cardStatus :qtd="aguardandoSolicitante" color="blue-grey lighten-3" titulo="Aguardando Solicitante" />
        </v-col>
        <v-col cols="15" sm="2">
          <cardStatus :qtd="aguardandoOP" color="red lighten-3" titulo="Aguardando OP" />
        </v-col>
        <v-col cols="15" sm="2">
          <cardStatus :qtd="finalizado" color="green lighten-3" titulo="Finalizados" />
        </v-col>
      </v-row>
    </v-sheet>

    <tabelaPlurimas :plurimas="plurimas" :loading="loadingTable"
      @initializeTable="(loadingTable = true), listarPlurimas(), listarStatus()" />
  </v-sheet>
</template>
  
<script>

import config from "@/config/store";
import urls from "@/config/urls";
import axios from "axios";
import tabelaPlurimas from "@/components/plurimas/tabelaplurimas";
import cardStatus from "@/components/plurimas/cardStatus.vue";
import formSolicitacao from "@/components/plurimas/formSolicitacao.vue";

export default {
  name: "plurimas",
  components: {
    cardStatus,
    tabelaPlurimas,
    formSolicitacao    
  },
  data: () => ({
    idUsuario: config.user().ID_USUARIO,
    Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
    plurimas: [],
    loadingTable: true,
    emAberto: null,
    emAndamento: null,
    analise: null,
    finalizado: null,
    aguardandoOP: null,
    aguardandoSolicitante: null,
    dialogSolicitarProcesso: false
  }),

  async mounted() {
    await this.listarPlurimas();
    await this.listarStatus();
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async listarPlurimas() {
      this.loadingTable = true;

      await axios
        .get(
          `${urls.urlLocal}plurimas`,
          {
            headers: {
              Authorization: this.Authorization,
            },
          }
        )
        .then((result) => {
          this.loadingTable = false;
          this.plurimas = result.data.result;
          this.loadingTable = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async listarStatus() {
      this.loadingTable = true;

      await axios
        .get(
          `${urls.urlLocal}plurimas`,
          {
            headers: {
              Authorization: this.Authorization,
            },
          }
        )
        .then((result) => {
          this.loadingTable = false;

          this.emAberto = result.data.result.filter(
            (processo) => processo.DESCRICAO === "EM ABERTO"
          ).length;
          this.emAndamento = result.data.result.filter(
            (processo) => processo.DESCRICAO === "EM ANDAMENTO"
          ).length;
          this.analise = result.data.result.filter(
            (processo) => processo.DESCRICAO === "EM ANÁLISE"
          ).length;
          this.finalizado = result.data.result.filter(
            (processo) => processo.DESCRICAO === "FINALIZADA"
          ).length;
          this.aguardandoOP = result.data.result.filter(
            (processo) => processo.DESCRICAO === "AGUARDANDO OP"
          ).length;
          this.aguardandoSolicitante = result.data.result.filter(
            (processo) => processo.DESCRICAO === "AGUARDANDO SOLICITANTE"
          ).length;
          this.plurimas = result.data.result;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

  }
};
</script> 
  
  