<template>
    <v-div>
        <v-stepper-content step="4">
            <v-form class="mb-0">
                <v-card class="mb-12 mt-0" min-height="700px" style="border: none;" outlined>
                    <v-row class="justify-end mr-0 mt-3 mb-5">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="mr-3" height="40" width="300" dark color="pink lighten-2" v-bind="attrs"
                                    v-on="on" @click="backstep"><v-icon class="mr-3" :size="25" right
                                        dark>mdi-page-previous-outline</v-icon>
                                    Pré-lista
                                </v-btn>
                            </template>
                            <span>Editar Pré-Lista</span>
                        </v-tooltip>
                    </v-row>

                    <v-toolbar dense color="brown lighten-3" dark><v-icon dark right>mdi-human-queue</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Lista de
                            Reclamantes</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon dark @click="exportToExcel">
                                        <v-icon v-bind="attrs" v-on="on">mdi-microsoft-excel</v-icon>
                                    </v-btn>
                                </template>
                                <span>Baixar Lista</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-data-table height="550px" :headers="headers" :items="listafinal" class="elevation-1">
                    </v-data-table>
                </v-card>
            </v-form>
        </v-stepper-content>

        <loading ref="loading" />
        <snack ref="snackbar" />
    </v-div>
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
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";
import * as XLSX from 'xlsx';

export default {
    name: "listafinal",
    components: {
        loading, snack
    },
    props: {
        idplurima: { type: Number },
        idlista: { type: Number }
    },
    data() {
        return {
            localIdLista: this.idlista,
            listafinal: [],
            lista: [],
            loadingTable: true,
            fixedFields: [],
            dynamicFields: [],
        };
    },
    watch: {
        idlista(newValue) {
            this.localIdLista = newValue;
            this.getConfigsLista();
        }
    },
    computed: {
        headers() {
            const dynamicHeaders = this.dynamicFields
                .filter(field => field !== 'MANTER_NA_LISTA')
                .map(field => ({
                    text: field.replace(/_/g, ' '),
                    value: field,
                    align: 'center'
                }));

            const fixedHeaders = this.fixedFields
                .filter(field => field !== 'MANTER_NA_LISTA')
                .map(field => ({
                    text: field.replace(/_/g, ' '),
                    value: field,
                    align: 'center'
                }));

            return [...fixedHeaders, ...dynamicHeaders];
        }
    },
    mounted() {
        this.$on('reset-component', () => {
            this.listafinal = []
        });

        this.$on('start-component', async () => {
            this.listafinal = []
            await this.getConfigsLista();
            this.dynamicFields = this.extractDynamicFields(this.listafinal);
            this.loadingTable = false;
        });
    },
    methods: {
        exportToExcel() {
            const filteredItems = this.listafinal.filter(item => item.MANTER_NA_LISTA);
            const ws = XLSX.utils.json_to_sheet(filteredItems);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');
            XLSX.writeFile(wb, `${this.lista.REF_LISTA}.xlsx`);
        },
        async getConfigsLista() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`
            ).then((response) => {
                this.lista = response.data.result;
                this.listafinal = JSON.parse(this.lista.CONFIG_LISTA.LISTA_FINAL).filter(r => r.MANTER_NA_LISTA);
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        extractDynamicFields(data) {
            const allFields = new Set();

            data.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (!this.fixedFields.includes(key)) {
                        allFields.add(key);
                    }
                });
            });

            return Array.from(allFields);
        },
        backstep() {
            this.$emit('back-step');
        },
    }
}

</script>