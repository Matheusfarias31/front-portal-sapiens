<template>
  <v-sheet class="py-5 mt-4 px-10">

    <tabelaPlurimas :plurimas="plurimas" :loading="loadingTable" @initializeTable="(loadingTable = true), listarPlurimas()" />
  </v-sheet>
</template>
  
<script>

import config from "@/config/store";
import urls from "@/config/urls";
import axios from "axios";
import tabelaPlurimas from "@/components/plurimas/tabelaplurimas";

export default {
  name: "plurimas",
  components: {
    tabelaPlurimas
  },
  data: () => ({
    idUsuario: config.user().ID_USUARIO,
    Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
    plurimas: [], 
    loadingTable: true,
  }),

  async mounted() {
    await this.listarPlurimas();
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
          console.log(this.plurimas)
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

  }
};
</script> 
  
  