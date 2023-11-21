<template>
  <v-sheet class="py-5 px-10">
    <v-data-table
      :headers="headersUsuarios"
      :items="dessertsUsuarios"
      :search="search"
      :loading="loadingTable"
      loading-text="Carregando... Aguarde por  favor!"
      class="text-no-wrap"
    >
      <template v-slot:[`item.ATIVO`]="{ item }">
        <v-chip :color="getColorStatus(item.ATIVO)" dark>
          {{ formatStatus(item.ATIVO) }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-6"
            tile
          ></v-text-field>
          <v-icon
            color="green lighten-1"
            large
            class="mr-2"
            @click="dialogForm = true"
          >
            mdi-account-plus-outline
          </v-icon>

          <v-icon
            color="green lighten-1"
            large
            class="mr-2"
            @click="initialize"
          >
            mdi-update
          </v-icon>

          <JsonExcel
            :data="dessertsUsuarios"
            :fields="headersUsuarios.text"
            name="Usuarios.xls"
          >
            <v-btn icon color="green lighten-1" large>
              <v-icon> mdi-tray-arrow-down</v-icon>
            </v-btn>
          </JsonExcel>

          <v-dialog v-model="dialogForm" max-width="900px">
            <v-form @submit.prevent="save">
              <v-card>
                <v-card-title>
                  <span class="text-h5">
                    {{ formTitle }}
                  </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.NOME"
                          label="Nome"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.EMAIL"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-if="indexSkill == -1">
                        <v-text-field
                          v-model="editedItem.SENHA"
                          label="Senha"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-combobox
                          item-text="Nome"
                          item-value="Id"
                          v-model="editedItem.SKILL"
                          :items="ItemsSkills"
                          label="Selecione o Skill"
                          required
                        >
                        </v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-if="indexSkill != -1">
                        <v-combobox
                          item-text="Nome"
                          item-value="Id"
                          v-model="editedItem.ATIVO"
                          :items="ItemsStatusUssuario"
                          label="Selecione o Status"
                          required
                        >
                        </v-combobox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn type="submit" color="blue darken-1" text>
                    Salvar
                  </v-btn>
                </v-card-actions>
                <v-card-actions v-if="indexSkill == -1">
                  <v-banner two-line>
                    <v-avatar slot="icon" color="green lighten-1" size="40">
                      <v-icon icon="mdi-lock" color="white"> mdi-lock </v-icon>
                    </v-avatar>
                    A senha precisa ter 8 caracteres, incluindo uma letra
                    maiúscula, uma minúscula e um caractere especial conforme
                    exemplo: Senha@123
                  </v-banner>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          color="green lighten-1"
          dense
          @click="editarUsuarioForm(item)"
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <snack ref="snackbar" />
  </v-sheet>
</template>

<script>
import axios from "axios";
import JsonExcel from "vue-json-excel";
import snack from "../shared/snackBar.vue";

export default {
  name: "usuarios",
  components: {
    JsonExcel,
    snack,
  },
  data: () => ({
    dialogForm: false,
    dialogDelete: false,
    headersUsuarios: [
      { text: "Id", value: "ID_USUARIO" },
      { text: "Nome", value: "NOME" },
      { text: "Email", value: "EMAIL" },
      { text: "Skill", value: "SKILL" },
      { text: "Sistema", value: "SISTEMA" },
      { text: "Ativo", value: "ATIVO" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    dessertsUsuarios: [],
    indexSkill: -1,
    snackbar: false,
    snackbarText: "",
    search: "",
    loadingTable: false,

    editedItem: {
      ID_USUARIO: "",
      NOME: "",
      EMAIL: "",
      SENHA: "",
      SKILL: "",
      SISTEMA: "",
      ATIVO: "",
    },
    defaultItem: {
      ID_USUARIO: "",
      NOME: "",
      EMAIL: "",
      SENHA: "",
      SKILL: "",
      SISTEMA: "",
      ATIVO: "",
    },
    ItemsStatusUssuario: [
      { Id: 0, Nome: "Inativo" },
      { Id: 1, Nome: "Ativo" },
    ],
    ItemsSkills: [],
    idSistema: [13],
    Authorization: "Bearer " + localStorage.getItem("tokenSistema_13"),
  }),

  created() {
    this.initialize();
    this.filterSkill();
  },
  computed: {
    formTitle() {
      return this.indexSkill === -1 ? "Novo Usuario" : "Editar Usuario";
    },
  },
  watch: {
    dialogForm(val) {
      val || this.close();
    },
  },
  methods: {
    async initialize() {
      this.loadingTable = true;
      this.dessertsUsuarios = [];

      await axios({
        method: "post",
        url: "http://192.168.4.45:3005/api.usuarios/v1/user/list",
        data: {
          idSistema: this.idSistema,
        },
      })
        .then((result) => {
          this.loadingTable = false;
          this.dessertsUsuarios = result.data.listUsers;
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.msg == "Token expirado!") {
            window.location.href = "http://192.168.4.45:3011/digitabern/logout";
          }
        });
    },
    async filterSkill() {
      await axios({
        method: "get",
        url: "http://192.168.4.45:3005/api.usuarios/v1/skill",
      })
        .then((result) => {
          let skillFilter = result.data.listSkills.filter(
            (user) => user.ID_SISTEMA == this.idSistema
          );
          skillFilter.forEach((element) => {
            this.ItemsSkills.push({ Id: element.ID, Nome: element.TIPO });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async criarUsuario() {
      await axios({
        method: "post",
        url: "http://192.168.4.45:3005/api.usuarios/v1/user",
        data: {
          nome: this.editedItem.NOME,
          email: this.editedItem.EMAIL,
          senha: this.editedItem.SENHA,
          skill: this.editedItem.SKILL.Id,
          idSistema: this.idSistema,
        },
        headers: {
          Authorization: this.Authorization,
        },
      })
        .then((result) => {
          this.$refs.snackbar.show({
            message: result.data.msg,
            status: result.data.status,
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          this.$refs.snackbar.show({
            message: err.response.data.msg,
            status: err.response.data.status,
          });
          if (err.response.data.msg == "Token expirado!") {
            window.location.href = "http://192.168.4.45:3011/digitabern/logout";
          }
        });
    },
    editarUsuarioForm(item) {
      this.indexSkill = item.ID_USUARIO;
      this.editedItem = {
        ID_USUARIO: item.ID_USUARIO,
        NOME: item.NOME,
        EMAIL: item.EMAIL,
        SKILL: this.ItemsSkills.filter(function (skill) {
          return skill.Nome == item.SKILL;
        })[0],
        SISTEMA: item.SISTEMA,
        ATIVO:
          item.ATIVO == false
            ? { Id: 0, Nome: "Inativo" }
            : { Id: 1, Nome: "Ativo" },
      };

      this.dialogForm = true;
    },
    async editarUsuario() {
      await axios({
        method: "put",
        url: "http://192.168.4.45:3005/api.usuarios/v1/user",
        data: {
          idSistema: this.idSistema[0],
          id: this.editedItem.ID_USUARIO,
          nome: this.editedItem.NOME,
          email: this.editedItem.EMAIL,
          skill: this.editedItem.SKILL.Id,
          ativo: this.editedItem.ATIVO.Id,
        },
        headers: {
          Authorization: this.Authorization,
        },
      })
        .then((result) => {
          this.$refs.snackbar.show({
            message: result.data.msg,
            status: result.data.status,
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          this.$refs.snackbar.show({
            message: err.response.data.msg,
            status: err.response.datas.tatus,
          });
          if (err.response.data.msg == "Token expirado!") {
            window.location.href = "http://192.168.4.45:3011/digitabern/logout";
          }
        });
    },
    async save() {
      if (this.indexSkill === -1) {
        await this.criarUsuario();
        await this.close();
      }

      if (this.indexSkill > -1) {
        await this.editarUsuario();
        await this.close();
      }
    },
    async close() {
      this.dialogForm = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.indexSkill = -1;
        this.initialize();
      });
    },
    formatStatus(item) {
      if (item == true) {
        return "Ativo";
      }
      if (item == false) {
        return "Inativo";
      }
    },
    getColorStatus(item) {
      if (item == true) return "green";
      if (item == false) return "red";
    },
  },
};
</script>