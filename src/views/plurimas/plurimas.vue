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

    <formSolicitacao :show="dialogSolicitarProcesso"
      @closeFormSolicitacao="dialogSolicitarProcesso = false, listarPlurimas(), getMiniDash()" />

    <v-sheet class="mt-12 py-1 ml-0 px-1 d-flex align-center">
      <v-row cols="15" class="pb-10">
        <template>
          <v-col cols="15" sm="2" v-for="item in miniDash" :key="item.ID">
            <div @click="filtrarPlurimasStatus(item.DESCRICAO)">
              <cardStatus :qtd="item.QUANTIDADE" :color="item.COLOR" :titulo="item.DESCRICAO"/>
            </div>
          </v-col>
        </template>
      </v-row>
    </v-sheet>

    <tabelaPlurimas :plurimas="plurimas" :loading="loadingTable"
      @initializeTable="(loadingTable = true), listarPlurimas(), listarStatus()" @closeViewPlurima="listarPlurimas(), getMiniDash()"/>
  </v-sheet>
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
    dialogSolicitarProcesso: false,
    miniDash: [],
    fitroStatus: false,
    filtroAnterior: ''
  }),
  async mounted() {
    await this.getMiniDash();
    await this.listarPlurimas();
    await this.listarStatus();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async getMiniDash() {
      await axios
        .get(
          `${process.env.VUE_APP_ROOT_API_BASE_URL}minidash`,
          {
            headers: {
              Authorization: this.Authorization,
            },
          }
        )
        .then((result) => {
          this.miniDash = result.data.result.filter(item => item.MINIDASH);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async listarPlurimas() {
      this.loadingTable = true;

      console.log(process.env.VUE_APP_ROOT_API_BASE_URL);

      await axios
        .get(
          `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas`,
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
    async filtrarPlurimasStatus(status) {      
      this.loadingTable = true;
      await this.listarPlurimas();
      
      if (this.fitroStatus && status === this.filtroAnterior) {                
        this.filtroAnterior = '';
        this.fitroStatus = false;
      } else {        
        this.plurimas = this.plurimas.filter(plurima => plurima.DESCRICAO === status)
        this.filtroAnterior = status;
        this.fitroStatus = true;
      }

      this.loadingTable = false;
    },
    async listarStatus() {
      this.loadingTable = true;

      await axios
        .get(
          `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas`,
          {
            headers: {
              Authorization: this.Authorization,
            },
          }
        )
        .then((result) => {
          this.plurimas = result.data.result;
          this.loadingTable = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

  }
};
</script> 
  
  