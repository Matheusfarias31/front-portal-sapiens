<template>
  <div>
    <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
      <div class="dialog-content">
        <v-card width="700px">
          <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
            <v-toolbar-title>Executar Motor de Organizar Documentos</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="solicitarExecOrgDocs">
            <v-card-text>
              <v-container>
                <v-combobox item-text="FILIAL" item-value="ID" v-model="selectedFilialOrgDocs" :items="filiaisOrgDocs"
                  label="Filial*" required class="mb-2"></v-combobox>
                <v-textarea required class="mt-2 mb-0 text-left align-start" label="Caminho"
                  placeholder="Caminho dos arquivos (Máx. 300 caracteres)" outlined maxlength="300"
                  v-model="caminhoOrgDOcs"></v-textarea>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="hideDialog">
                Cancelar
              </v-btn>
              <v-btn type="submit" color="deep-purple darken-1" text>
                Salvar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>
    <loading ref="loading" />
  </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";

export default {
  components: {
    loading
  },
  props: {
    zIndex: {
      type: Number,
      default: 1000 // Valor padrão para z-index
    },
    idplurima: {
      type: Number
    },
    idusuario: {
      type: Number
    }
  },
  data() {
    return {
      showDialog: false,
      filiaisOrgDocs: [],
      selectedFilialOrgDocs: { ID: null, FILIAL: null },
      caminhoOrgDOcs: ''
    };
  },
  mounted() {
    this.$on('show-dialog', (show) => {
      this.getFiliaisOrgDocs();
      this.showDialog = show;
    });

  },
  methods: {
    hideDialog() {
      this.selectedFilialOrgDocs = { ID: null, FILIAL: null };
      this.caminhoOrgDOcs = '';
      this.showDialog = false;
    },
    async getFiliaisOrgDocs() {
      await axios.get(
        `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}filiais`
      ).then((response) => {
        this.filiaisOrgDocs = response.data.result;
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    async solicitarExecOrgDocs() {
      this.$refs.loading.dialog = true;

      if (this.caminhoOrgDOcs == "") {
        this.$refs.snackbar.show({
          message: "Por favor, informe um caminho.",
          status: false,
        });
        this.$refs.loading.dialog = false;
        return;
      }

      await axios.post(`${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}solicitacoes`, {
        ID_PLURIMA: this.idplurima,
        ID_USUARIO: this.idusuario,
        ID_FILIAL: this.selectedFilialOrgDocs.ID,
        PRIORIDADE: false,
        CAMINHO: this.caminhoOrgDOcs,
        ORIGEM: 'PLURIFY'
      }).then((response) => {
        this.$refs.loading.dialog = false;
        this.hideDialog();                        
        this.$emit('atualizarexecorgdocs');
        this.$refs.snackbar.show({
          message: response.data.result,
          status: response.data.status,
        });        
      }).catch((err) => {
        console.log(err);
      });
    }    
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(234, 0, 255, 0.020);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: rgba(255, 255, 255, 0);
  /* Totalmente transparente */
  padding: 0px;
  border-radius: 2px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
}

.dialog-content button {
  margin-top: 10px;
}
</style>
