<template>
    <v-sheet class="py-5 px-10">
        <v-sheet class="py-5 px-3">
            <v-row class="justify-end mb-1">
                <v-btn height="40" dark color="deep-purple lighten-2" @click="editMiniDash">
                    Editar Minidash
                    <v-icon :size="25" right dark>mdi-chart-arc</v-icon>
                </v-btn>
            </v-row>
        </v-sheet>

        <v-data-table :headers="headerStatus" :items="status" :search="search" :loading="loadingTable"
            loading-text="Carregando... Aguarde por  favor!" class="text-no-wrap">
            <template v-slot:top>
                <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
                    <v-toolbar-title>Status</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
                        v-model="search"></v-text-field>
                    <v-icon @click="createStatus" large class="mr-2">mdi-playlist-plus</v-icon>
                    <v-icon @click="listarStatus" large class="mr-2">mdi-update</v-icon>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26" @click="editStatus(item)"
                            class="mr-2" :disabled="loadingTable">
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Editar Status</span>
                </v-tooltip>
            </template>
            <template v-slot:[`item.MINIDASH`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-if="!item.MINIDASH" v-bind="attrs" v-on="on" color="red lighten-2" :size="30" class="mr-2"
                            :disabled="loadingTable">
                            mdi-chart-arc
                        </v-icon>
                        <v-icon v-if="item.MINIDASH" v-bind="attrs" v-on="on" color="green lighten-2" :size="40"
                            class="mr-2" :disabled="loadingTable">
                            mdi-chart-arc
                        </v-icon>
                    </template>
                    <span>Minidash</span>
                </v-tooltip>
            </template>
            <template v-slot:[`item.ATIVO`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-if="!item.ATIVO" v-bind="attrs" v-on="on" color="red lighten-2" :size="30" class="mr-2"
                            :disabled="loadingTable">
                            mdi-lightbulb
                        </v-icon>
                        <v-icon v-if="item.ATIVO" v-bind="attrs" v-on="on" color="green lighten-2" :size="40" class="mr-2"
                            :disabled="loadingTable">
                            mdi-lightbulb-on
                        </v-icon>
                    </template>
                    <span v-if="!item.ATIVO">Inativo</span>
                    <span v-if="item.ATIVO">Ativo</span>
                </v-tooltip>
            </template>
            <template v-slot:[`item.COLOR`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" :color="item.COLOR" :size="40" class="mr-2"
                            :disabled="loadingTable">
                            mdi-palette
                        </v-icon>
                    </template>
                    <span>{{ item.COLOR }}</span>
                </v-tooltip>
            </template>
        </v-data-table>

        <v-dialog v-model="dialogAddStatus" persistent max-width="600px">
            <v-form @submit.prevent="saveAddStatus">
                <v-card>
                    <v-toolbar color="deep-purple lighten-2" title="CriarStatus" dark>
                        <v-toolbar-title>Criar Status</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <p class="mb-2">Cor do Status:</p>
                                    <v-btn class="mt-0" size="small" :color="this.statusCreate.COLOR" dark
                                        @click="selecionarCores(color)">{{
                                            this.statusCreate.COLOR }}</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <p class="mb-0">Status:</p>
                                    <v-text-field class="mt-0" label="" type="text" v-model="statusCreate.DESCRICAO"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="closeAddStatus">
                            Cancelar
                        </v-btn>
                        <v-btn type="submit" color="deep-purple darken-1" text>
                            Salvar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="dialogForm" persistent max-width="600px">
            <v-form @submit.prevent="save">
                <v-card>
                    <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                        <v-toolbar-title>Editar Status | {{ this.editedStatus.DESCRICAO }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <p class="mb-2">Cor do Status:</p>
                                    <v-btn class="mt-0" size="small" :color="this.editedStatus.COLOR" dark
                                        @click="selecionarCores(color)">{{
                                            this.editedStatus.COLOR }}</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <p class="mb-0">Ativo:</p>
                                    <v-combobox class="mt-0" item-text="Nome" item-value="Id" v-model="editedStatus.ATIVO"
                                        :items="itemsStatus" required>
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="close">
                            Cancelar
                        </v-btn>
                        <v-btn type="submit" color="deep-purple darken-1" text>
                            Salvar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="dialogColor" persistent max-width="900px">
            <v-form @submit.prevent="save">
                <v-card class="no-scroll-card" color="deep-purple lighten-4" flat>
                    <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                        <v-toolbar-title>Selecione uma Cor</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="mt-0 ml-0">
                        <v-card class="mt-3 mr-0 ml-0 mb-0" color="deep-purple lighten-4" flat style="overflow-x: hidden;"
                            height="400">
                            <v-row justify="center">
                                <v-col cols="auto" v-for="color in cores" :key="color.ID">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on" size="small" :color="color.COLOR" dark
                                                @click="corSelecionada(color)">{{ color.COLOR
                                                }}</v-btn>
                                        </template>
                                        <span>{{ color.COLOR }}</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="dialogMiniDash" persistent width="600px">
            <v-form @submit.prevent="saveMiniDash">
                <v-card color="deep-purple lighten-4" flat width="600px">
                    <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark class="mb-0">
                        <v-toolbar-title>Defina os status presentes na Minidash</v-toolbar-title>
                    </v-toolbar>
                    <v-card-subtitle class="mt-0 mb-0">
                        *A Minidash deve conter 6 itens.
                    </v-card-subtitle>

                    <v-card-text class="mt-0 ml-0">
                        <v-data-table :headers="headersMiniDash" :items="statusMiniDash" class="text-no-wrap"
                            :items-per-page="5">
                            <template v-slot:[`item.MINIDASH`]="{ item }">
                                <template>
                                    <v-row justify="center">
                                        <v-switch color="deep-purple lighten-2" v-model="item.MINIDASH"
                                            @change="onSwitchChange(item)"></v-switch>
                                    </v-row>
                                </template>
                            </template>
                            <template v-slot:[`item.ATIVO`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-if="!item.ATIVO" v-bind="attrs" v-on="on" color="red lighten-2" :size="30"
                                            class="mr-2" :disabled="loadingTable">
                                            mdi-lightbulb
                                        </v-icon>
                                        <v-icon v-if="item.ATIVO" v-bind="attrs" v-on="on" color="green lighten-2"
                                            :size="40" class="mr-2" :disabled="loadingTable">
                                            mdi-lightbulb-on
                                        </v-icon>
                                    </template>
                                    <span v-if="!item.ATIVO">Inativo</span>
                                    <span v-if="item.ATIVO">Ativo</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-subtitle class="mt-0 mb-0">
                        {{ this.textMinidash }}
                        <v-icon v-if="this.contMinidash === 6" color="green">mdi-check-circle</v-icon>
                        <v-icon v-if="this.contMinidash != 6" color="red">mdi-alpha-x-circle</v-icon>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="closeEditMiniDash">
                            Cancelar
                        </v-btn>
                        <v-btn type="submit" color="deep-purple darken-1" text>
                            Salvar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <loading ref="loading" />
        <snack ref="snackbar" />
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

.no-scroll-card {
    overflow: hidden;
}
</style>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: "Status",
    components: {
        loading, snack
    },
    data: () => ({
        dialogAddStatus: false,
        statusCreate: {
            DESCRICAO: '',
            ID_COLOR: 88,
            COLOR: 'deep-purple lighten-2'
        },
        textMinidash: '',
        contMinidash: 6,
        statusMiniDash: [],
        headersMiniDash: [
            { text: "STATUS", value: "DESCRICAO" },
            { text: "ATIVO", value: "ATIVO", align: "center" },
            { text: "MINIDASH", value: "MINIDASH", align: "center" }
        ],
        status: [],
        headerStatus: [
            { text: "Ações", value: "actions", sortable: false, align: "center" },
            { text: "STATUS", value: "DESCRICAO" },
            { text: "ATIVO", value: "ATIVO", align: "center" },
            { text: "MINIDASH", value: "MINIDASH", align: "center" },
            { text: "COR", value: "COLOR", align: "center" },
        ],
        loadingTable: true,
        search: '',
        cores: [],
        dialogForm: false,
        dialogColor: false,
        dialogMiniDash: false,
        editedStatus: {
            ID_STATUS: '',
            ATIVO: '',
            ID_COLOR: '',
            COLOR: '',
            DESCRICAO: ''
        },
        itemsStatus: [
            { Id: 0, Value: 'false', Nome: "NÃO" },
            { Id: 1, Value: 'true', Nome: "SIM" },
        ]
    }),
    created() {
        this.listarCores();
        this.listarStatus();
    },
    methods: {
        createStatus() {
            this.dialogAddStatus = true;
        },
        onSwitchChange(item) {
            if (item.MINIDASH) {
                this.contMinidash += 1;
                this.textMinidash = `Você possui ${this.contMinidash} itens selecionados.`
            } else {
                this.contMinidash -= 1;
                this.textMinidash = `Você possui ${this.contMinidash} itens selecionados.`
            }
        },
        corSelecionada(item) {

            if (this.dialogForm) {
                this.editedStatus.COLOR = item.COLOR;
                this.editedStatus.ID_COLOR = item.ID;
                this.dialogColor = false;
            } else {
                this.statusCreate.COLOR = item.COLOR;
                this.statusCreate.ID_COLOR = item.ID;
                this.dialogColor = false;
            }
        },
        async selecionarCores() {
            await this.listarCores();
            this.dialogColor = true;
        },
        async editStatus(item) {
            await this.listarCores();
            this.editedStatus = item;
            this.editedStatus.ATIVO = item.ATIVO ? 'SIM' : 'NÃO';
            this.dialogForm = true;
        },
        async listarStatus() {
            this.loadingTable = true;
            this.status = [];

            axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}status`,
            })
                .then((result) => {
                    this.status = result.data.result;
                    this.loadingTable = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async listarCores() {
            this.cores = [];

            axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}cores`,
            })
                .then((result) => {
                    this.cores = result.data.result;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async save() {
            this.$refs.loading.dialog = true;

            console.log(this.editedStatus.ATIVO);
            await axios({
                method: 'patch',
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}status`,
                data: {
                    ID_STATUS: this.editedStatus.ID,
                    ATIVO: this.editedStatus.ATIVO.Nome === "NÃO" ? 0 : 1,
                    ID_COLOR: this.editedStatus.ID_COLOR
                }
            }).then((result) => {
                this.$refs.loading.dialog = false;
                this.$refs.snackbar.show({
                    message: result.data.result,
                    status: result.data.status,
                });
                this.close();
            }).catch((err) => {
                this.$refs.loading.dialog = false;
                this.$refs.snackbar.show({
                    message: err.response.data.msg,
                    status: err.response.data.status,
                });
            });
        },
        async close() {
            this.dialogForm = false;
            await this.listarStatus()
        },
        async closeEditMiniDash() {
            this.dialogMiniDash = false;
            this.contMinidash = 6;
            this.statusMiniDash = [];
            await this.listarStatus()
        },
        async saveMiniDash() {
            if (this.contMinidash != 6) {
                this.$refs.snackbar.show({
                    message: `Você selecionou ${this.contMinidash} itens. A MiniDash deve conter 6 itens.`,
                    status: false,
                });
            } else {
                this.$refs.loading.dialog = true;
                let statusArray = [];

                for (let item of this.statusMiniDash) {
                    statusArray.push({
                        "ID_STATUS": item.ID,
                        "MINIDASH": item.MINIDASH
                    });
                }

                await axios.patch(`${process.env.VUE_APP_ROOT_API_BASE_URL}minidash`, {
                    STATUS: statusArray
                }).then((result) => {
                    console.log(result);
                    this.$refs.loading.dialog = false;
                    this.$refs.snackbar.show({
                        message: result.data.result,
                        status: result.data.status,
                    });
                    this.closeEditMiniDash();
                }).catch((err) => {
                    this.$refs.loading.dialog = false;
                    this.$refs.snackbar.show({
                        message: err.response.data.msg,
                        status: err.response.data.status,
                    });
                });
            }
        },
        editMiniDash() {
            this.statusMiniDash = JSON.parse(JSON.stringify(this.status));
            this.textMinidash = `Você possui ${this.contMinidash} itens selecionados.`
            this.dialogMiniDash = true;
        },
        async closeAddStatus() {
            this.dialogAddStatus = false;
            this.statusCreate = {
                DESCRICAO: '',
                ID_COLOR: 88,
                COLOR: 'deep-purple lighten-2'
            };

            await this.listarStatus()
        },
        async saveAddStatus() {
            this.$refs.loading.dialog = true;

            if (this.statusCreate.DESCRICAO === "") {
                this.$refs.loading.dialog = false;

                this.$refs.snackbar.show({
                    message: "O status não pode estar vazio.",
                    status: false,
                });
            } else {
                await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}status`, this.statusCreate).then((result) => {
                    console.log(result);
                    this.$refs.loading.dialog = false;
                    this.$refs.snackbar.show({
                        message: result.data.result,
                        status: result.data.status,
                    });
                    this.closeAddStatus();
                }).catch((err) => {
                    this.$refs.loading.dialog = false;
                    this.$refs.snackbar.show({
                        message: err.response.data.msg,
                        status: err.response.data.status,
                    });
                });
            }
        }
    }
}

</script>