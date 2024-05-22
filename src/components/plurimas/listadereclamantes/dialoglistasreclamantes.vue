<template>
    <div>
        <v-dialog v-model="showDialog" persistent max-width="1000px">
            <v-card max-width="1000px">
                <v-toolbar color="deep-purple lighten-2" title="listareclamantes" dark>
                    <v-icon dark right>mdi-format-list-numbered</v-icon>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-toolbar-title>Listas de Reclamantes - Plúrima: {{ localNumeroProcesso }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                    <v-toolbar-items class="d-flex align-center my-2">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon dark class="mb-0" @click="criarLista()">
                                    <v-icon v-bind="attrs" v-on="on">mdi-format-list-group-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Criar Lista</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="mb-0" icon dark @click="buscarListas()">
                                    <v-icon v-bind="attrs" v-on="on">mdi-update</v-icon>
                                </v-btn>
                            </template>
                            <span>Atualizar Listas</span>
                        </v-tooltip>
                    </v-toolbar-items>
                </v-toolbar>
                <v-data-table :headers="headerslistas" :items="listas" item-key="ID" :loading="loadingTable"
                    class="text-no-wrap" fixed-header>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26" class="mr-2"
                                    @click="editarLista(item)">
                                    mdi-text-box-edit-outline
                                </v-icon>
                            </template>
                            <span>Editar Lista</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="cyan lighten-2" :size="26" class="mr-2">
                                    mdi-eye
                                </v-icon>
                            </template>
                            <span>Visualizar Lista Final</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="brown lighten-2" :size="26" class="mr-2"
                                    @click="baixarListaFinal(item)">
                                    mdi-download-circle-outline
                                </v-icon>
                            </template>
                            <span>Baixar Lista</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="blue lighten-2" :size="26" class="mr-2">
                                    mdi-content-duplicate
                                </v-icon>
                            </template>
                            <span>Duplicar Lista</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="red lighten-2" :size="26" class="mr-2"
                                    @click="deletarLista(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Deletar Lista</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:[`item.CREATED_AT`]="{ item }">
                        {{ convertData(item.CREATED_AT) }}
                    </template>
                </v-data-table>
                <v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="hideDialog">
                            Fechar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <loading ref="loading" />
        <snack ref="snackbar" />
        <dialogCriarListaReclamantes ref="criarlistareclamantes" @atualizarlistas="this.buscarListas" />
        <dialogStepper :lista="listaSelecionada" ref="steppereditlista" />
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";
import dialogCriarListaReclamantes from "./dialogCriarListaReclamantes.vue";
import dialogStepper from "./dialogStepper.vue"
import * as XLSX from 'xlsx';

export default {
    name: 'listareclamantes',
    props: {
        show: Boolean,
        idplurima: Number,
        numeroprocesso: String
    },
    components: {
        loading, snack, dialogCriarListaReclamantes, dialogStepper
    },
    data() {
        return {
            showDialog: false,
            localIdPlurima: this.idplurima,
            localNumeroProcesso: this.numeroprocesso,
            loadingTable: false,
            listas: [],
            headerslistas: [
                { text: "Ações", value: "actions", sortable: false, align: "center" },
                { text: "ID", value: "ID", align: "center" },
                { text: "REFERÊNCIA", value: "REF_LISTA", align: "center" },
                { text: "CRIADOR", value: "NOME_USUARIO", align: "center" },
                { text: "DATA DE CRIAÇÃO", value: "CREATED_AT", align: "center" },
            ],
            listaSelecionada: null
        }
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            await this.buscarListas();
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    watch: {
        idplurima(newValue) {
            this.localIdPlurima = newValue;
        },
        numeroprocesso(newValue) {
            this.localNumeroProcesso = newValue
        }
    },
    methods: {
        async baixarListaFinal(item) {
            this.$refs.loading.dialog = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.localIdPlurima}/listareclamantes/${item.ID}`
            ).then((response) => {
                const lista = response.data.result;

                if(lista.CONFIG_LISTA.LISTA_FINAL === undefined){
                    this.$refs.loading.dialog = false;
                    this.$refs.snackbar.show({
                        message: `A lista final ainda não foi criada.`,
                        status: 'alert',
                    });
                    return;
                }
                
                const filteredItems = JSON.parse(lista.CONFIG_LISTA.LISTA_FINAL).filter(r => r.MANTER_NA_LISTA);
                const ws = XLSX.utils.json_to_sheet(filteredItems);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Data');
                XLSX.writeFile(wb, `${item.REF_LISTA}.xlsx`);
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        exportToExcel() {
            const filteredItems = this.listafinal.filter(item => item.MANTER_NA_LISTA);
            const ws = XLSX.utils.json_to_sheet(filteredItems);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');
            XLSX.writeFile(wb, `${this.lista.REF_LISTA}.xlsx`);
        },
        hideDialog() {
            this.listas = [];
            this.showDialog = false;
        },
        criarLista() {
            this.$refs.criarlistareclamantes.idplurima = this.localIdPlurima;
            this.$refs.criarlistareclamantes.$emit('show-dialog', true);
        },
        editarLista(item) {
            this.listaSelecionada = item;
            this.$refs.steppereditlista.localLista = item;
            this.$refs.steppereditlista.localIdPlurima = this.localIdPlurima;
            this.$refs.steppereditlista.$emit('show-dialog', true);
        },
        async buscarListas() {
            this.loadingTable = true;
            this.listas = [];
            await axios.get(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.localIdPlurima}/listareclamantes`)
                .then((response) => {
                    this.listas = response.data.result;
                    this.loadingTable = false;
                }).catch((err) => {
                    console.log(err);
                });
        },
        async deletarLista(lista) {
            this.$refs.loading.dialog = true;
            await axios.delete(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.localIdPlurima}/listareclamantes/${lista.ID}`)
                .then((response) => {
                    this.$refs.snackbar.show({
                        message: `${response.data.result}`,
                        status: response.data.status,
                    });

                    this.buscarListas();
                }).catch((err) => {
                    console.log(err);
                });

            this.$refs.loading.dialog = false;
        },
        convertData(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
    },
}

</script>