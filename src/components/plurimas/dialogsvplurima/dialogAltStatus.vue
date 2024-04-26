<template>
  <div>
    <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
      <div class="dialog-content">
        <v-card width="500px">
          <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
            <v-toolbar-title>Alterar Status</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="saveStatus">
            <v-card-text>
              <v-container>
                <v-combobox item-text="DESCRICAO" item-value="ID" v-model="selectedStatus" :items="statusAtivos"
                  label="Status*" required class="mb-2"></v-combobox>
                <v-textarea class="mt-2 mb-0 text-left align-start" label="Observação"
                  placeholder="Observação (Máx. 300 caracteres)" outlined maxlength="300"
                  v-model="observacaoStatus"></v-textarea>
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
      message: '',
      statusAtivos: [],
      selectedStatus: { ID: null, DESCRICAO: null },
      observacaoStatus: '',
    };
  },
  mounted() {
    this.$on('show-dialog', (show) => {
      this.getStatusAtivos();
      this.showDialog = show;
    });

  },
  methods: {
    hideDialog() {
      this.showDialog = false;
    },
    async getStatusAtivos() {
      this.statusAtivos = [];

      await axios({
        method: "get",
        url: `${process.env.VUE_APP_ROOT_API_BASE_URL}status/ativos`,
      })
        .then((response) => {
          this.statusAtivos = response.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async saveStatus() {
      this.$refs.loading.dialog = true;
      await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima`, {
        ID_STATUS: this.selectedStatus.ID,
        OBSERVACAO: this.observacaoStatus,
        ID_PLURIMA: this.idplurima,
        ID_USUARIO: this.idusuario
      }).then(() => {
        this.showDialog = false;
        this.observacaoStatus = '';
        this.selectedStatus = { ID: null, DESCRICAO: null };
        this.$emit('atualizarstatus');
        this.$refs.loading.dialog = false;
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
