<template>
  <v-sheet class="py-5 mt-4 px-10">

    <v-row class="pb-8">
      <v-col cols="12" sm="3">
        <cardStatus :qtd="emAberto" color="accent" titulo="Em Aberto" />
      </v-col>
      <v-col cols="12" sm="3">
        <cardStatus :qtd="analise" color="orange lighten-4" titulo="Em Análise" />
      </v-col>
      <v-col cols="12" sm="3">
        <cardStatus :qtd="emAndamento" color="brown lighten-4" titulo="Em Andamento" />
      </v-col>
      <v-col cols="12" sm="3">
        <cardStatus :qtd="finalizado" color="green lighten-4" titulo="Finalizados" />
      </v-col>
    </v-row>

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

export default {
  name: "plurimas",
  components: {
    cardStatus,
    tabelaPlurimas
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
  }),

  async mounted() {
    await this.listarPlurimas();
    await this.listarStatus();
  },

  methods: {
    async listarPlurimas() {


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
            (processo) => processo.DESCRICAO === "EM ANÁLISE"
          ).length;
          this.analise = result.data.result.filter(
            (processo) => processo.DESCRICAO === "EM ANDAMENTO"
          ).length;
          this.finalizado = result.data.result.filter(
            (processo) => processo.DESCRICAO === "FINALIZADA"
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
  
  