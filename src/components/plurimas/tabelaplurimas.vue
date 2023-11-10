<template>
  <!-- Início do template -->
  <div>
    <v-data-table :headers="headers" :items="PlurimasV" item-key="ID" dense :search="search" :loading="loadingTable"
      class="mb-16 text-no-wrap" height="400" fixed-header :footer-props="{ 'items-per-page-options': [-1] }">

      <template v-slot:top>

        <v-btn height="60" @click="dialogSolicitarProcesso = true" color="primary" class="ma-2 white--text"
          border-radius="4px">
          Solicitar plúrima
          <v-icon right dark> mdi-file-document-plus </v-icon>
        </v-btn>


        <v-form @submit.prevent="criarProcesso" ref="form" v-model="valid" lazy-validation>
          <v-row justify="center">
            <v-dialog v-model="dialogSolicitarProcesso" persistent max-width="600px">
              <v-card>
                <v-toolbar color="accent" dark>Solicitar Plúrima</v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu ref="dataDevolutivaMenu" v-model="dataDevolutivaMenu" :close-on-content-click="false"
                          transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field :rules="rules" v-model="prazoDevolutiva" label="Prazo Devolutiva*"
                              prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                          </template>
                          <v-date-picker v-model="prazoDevolutiva" no-title scrollable :min="minData" locale="pt">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="dataDevolutivaMenu = false">
                              Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="
                              $refs.dataDevolutivaMenu.save(prazoDevolutiva)
                              ">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>


                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox v-model="docfisico" label="Docs físicos" required></v-checkbox>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox v-model="timePlurimas" label="Time Plúrimas" required></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="reclamante" :rules="rules" label="ID Fase*" persistent-hint
                          required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="reclamante" :rules="rules" label="ID Solicitante*" persistent-hint
                          required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="reclamante" :rules="rules" label="ID Cliente*" persistent-hint
                          required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="reclamante" :rules="rules" label="ID Trabalho*" persistent-hint
                          required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field :rules="rules" return-masked-value v-mask="'#######-##.####.#.##.####'"
                          label="Processo*" type="text" v-model="processo" required></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field v-model="link" :rules="rules" label="Link*" type="text" required></v-text-field>
                      </v-col>


                      <v-col cols="12">
                        <v-textarea v-model="obs" :rules="rules" outlined name="input-7-4" label="Observação"
                          :value="null" required></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indica campo obrigatório</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="(dialogSolicitarProcesso = false), reset()" text>
                    Fechar
                  </v-btn>
                  <v-btn :disabled="!valid" type="submit" color="blue darken-1" text
                    @click="(valid = false), salvarProcesso()">
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-form>


        <!-- Segunda barra de ferramentas (barra de busca) -->
        <v-toolbar flat class="mb-8">
          <v-spacer></v-spacer>
          <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
            v-model="search"></v-text-field>
          <v-icon @click="initializeTable" color="accent" large class="mr-2">mdi-update</v-icon>
        </v-toolbar>

      </template>



      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="#a07aff" :size="26" @click="getCalculoById(item)" class="mr-2"
              :disabled="loadingTableCalculos">
              mdi-eye-outline
            </v-icon>
          </template>
          <span>Visualizar Cálculo</span>
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
        { text: "CRIACAO", value: "DATA_CRIACAO" },
        { text: "SOLICITANTE", value: "NOME_SOLICITANTE" },
        { text: "CLIENTE", value: "NOME_CLIENTE" },
        { text: "FASE", value: "FASE" },
        { text: "TRABALHO", value: "TRABALHO" },
        { text: "ETAPA", value: "ETAPA" },
        { text: "STATUS", value: "DESCRICAO" },
        { text: "TIME PLURIMAS", value: "TIME_PLURIMAS" },
      ],
      PlurimasV: this.plurimas,
      selecao: [],
    };
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


    initializeTable() {
      this.Empreitadas = [];
      this.$emit("initializeTable");
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
      if (item.DESCRICAO == "EM ABERTO") return "green lighten-4";
      if (item.DESCRICAO == "EM ANÁLISE") return "brown lighten-4";
      if (item.DESCRICAO == "AGUARDANDO CLIENTE") return "orange lighten-4";
      if (item.DESCRICAO == "AGUARDANDO SOLICITANTE") return "green lighten-4";
      if (item.DESCRICAO == "AGUARDANDO OP") return "green lighten-4";
      if (item.DESCRICAO == "EM ANDAMENTO") return "green lighten-4";
      if (item.DESCRICAO == "CANCELADA") return "green lighten-4";
      if (item.DESCRICAO == "RECUSADA") return "green lighten-4";
      if (item.DESCRICAO == "FINALIZADA") return "green lighten-4";
    },
  },
};
</script>
