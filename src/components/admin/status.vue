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

        <template>
            <v-dialog v-model="dialogMiniDash" persistent max-width="600px">
                <v-form @submit.prevent="saveMiniDash">
                    <v-card class="no-scroll-card" color="deep-purple lighten-4" flat>
                        <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                            <v-toolbar-title>Defina os status presentes na Minidash</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="mt-0 ml-0">
                            <v-data-table :headers="headersMiniDash" :items="this.statusMiniDash" class="text-no-wrap">
                                <template v-slot:[`item.MINIDASH`]="{ item }">
                                    <template>
                                        <v-row justify="center">
                                            <v-switch v-model="item.MINIDASH"></v-switch>
                                        </v-row>
                                    </template>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-dialog>
        </template>

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
import urls from "@/config/urls";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: "Status",
    components: {
        loading, snack
    },
    data: () => ({
        statusMiniDash: [],
        headersMiniDash: [
            { text: "STATUS", value: "DESCRICAO" },
            { text: "ATIVAR", value: "MINIDASH", align: "center" }
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
        this.listarStatus();
    },
    methods: {
        corSelecionada(item) {
            this.editedStatus.COLOR = item.COLOR;
            this.editedStatus.ID_COLOR = item.ID;
            this.dialogColor = false;
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
                url: `${urls.urlLocal}status`,
            })
                .then((result) => {
                    this.statusMiniDash = result.data.result.filter(item => item.ATIVO === true);
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
                url: `${urls.urlLocal}cores`,
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
            await axios({
                method: 'patch',
                url: `${urls.urlLocal}status`,
                data: {
                    ID_STATUS: this.editedStatus.ID,
                    ATIVO: this.editedStatus.ATIVO.Nome === "SIM" ? 1 : 0,
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
        editMiniDash() {
            this.dialogMiniDash = true;
        }
    }
}


</script>