<template>
    <v-sheet class="py-5 px-10">
        <v-data-table :headers="headersmodelos" :items="modelos" :search="search" :loading="loadingtable"
            loading-text="Carregando... Aguarde por  favor!" class="text-no-wrap">
            <template v-slot:top>
                <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
                    <v-toolbar-title>Modelos Disponíveis</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details class="mr-6" tile
                        v-model="search"></v-text-field>
                    <v-icon @click="listarModelos" large class="mr-2">mdi-update</v-icon>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" color="teal darken-1" :size="26" class="mr-2"
                            :disabled="loadingtable" @click="detalhamentoDoModelo(item.ID)">
                            mdi-puzzle-edit-outline
                        </v-icon>
                    </template>
                    <span>Editar Campos do Modelo</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" color="amber darken-3" :size="26" class="mr-2"
                            :disabled="loadingtable">
                            mdi-information-variant-circle-outline
                        </v-icon>
                    </template>
                    <span>Observação: {{ item.OBSERVACAO }}</span>
                </v-tooltip>
            </template>
            <template v-slot:[`item.CREATED_AT`]="{ item }">
                {{ convertData(item.CREATED_AT) }}
            </template>
        </v-data-table>

        <v-dialog v-model="dialogmodelo" persistent max-width="1000px">
            <v-form>
                <v-card class="no-scroll-card" flat style="overflow-x: hidden;">
                    <v-toolbar color="deep-purple lighten-2" title="detalhemodelo" dark>
                        <v-toolbar-title>Detalhamento do Modelo</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <template>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" icon dark @click="salvarConfigsModelo">
                                            <v-icon>mdi-content-save-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Salvar Configuração</span>
                                </v-tooltip>
                            </template>
                            <template>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" icon dark @click="closeDetalhamento">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Fechar Sem Salvar</span>
                                </v-tooltip>
                            </template>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-row justify="start">
                            <v-col cols="12" sm="6" md="6">
                                <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                    height="50"><v-card-text class="mt-0"><v-icon light
                                            right>mdi-file-document-outline</v-icon><v-divider class="mx-2" inset
                                            vertical></v-divider>Tipo de Documento: {{ this.modelodetalhado.TIPO
                                        }}</v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                    height="50"><v-card-text class="mt-0"><v-icon light
                                            right>mdi-information-box-outline</v-icon><v-divider class="mx-2" inset
                                            vertical></v-divider>Referência do Modelo: {{
            this.modelodetalhado.REF_MODELO
        }}</v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row justify="start">
                            <v-col cols="12" sm="6" md="6">
                                <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                    height="50"><v-card-text class="mt-0"><v-icon light
                                            right>mdi-information-variant-circle-outline</v-icon><v-divider class="mx-2"
                                            inset vertical></v-divider>Observação: {{ this.modelodetalhado.OBSERVACAO
                                        }}</v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat height="50">
                                    <v-card-text class="mt-0">
                                        <v-icon light right>mdi-calendar-range</v-icon>
                                        <v-divider class="mx-2" inset vertical></v-divider>
                                        Criação: {{ this.convertData(this.modelodetalhado.CREATED_AT) }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-subtitle class="mt-0 mb-0">
                        LEGENDAS <br>
                        VERBA: Este campo pertence a uma verba financeira. <br>
                        REGISTRO CP: Este campo é registro de batida de cartão de ponto. <br>
                        ATIVO: Na gestão de dados, você visualizará este campo. <br>
                        IDENTIDADE: Este campo é identidade de um reclamante (Ex.: CPF, MATRÍCULA, PIS.).
                    </v-card-subtitle>
                    <v-card-text class="mt-0 ml-0">
                        <v-data-table :headers="headerscampos" :items="camposmodelo" class="text-no-wrap"
                            :items-per-page="30">
                            <template v-slot:[`item.VERBA`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-if="!item.VERBA" v-bind="attrs" v-on="on" color="red lighten-2"
                                            :size="30" class="mr-3" :disabled="loadingtable">
                                            mdi-cash-off
                                        </v-icon>
                                        <v-icon v-if="item.VERBA" v-bind="attrs" v-on="on" color="green lighten-2"
                                            :size="30" class="mr-3" :disabled="loadingtable">
                                            mdi-cash
                                        </v-icon>
                                    </template>
                                    <span>Verba Financeira</span>
                                </v-tooltip>
                            </template>
                            <template v-slot:[`item.REGISTRO_CP`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-if="!item.REGISTRO_CP" v-bind="attrs" v-on="on" color="red lighten-2"
                                            :size="30" class="mr-3" :disabled="loadingtable">
                                            mdi-timer-off-outline
                                        </v-icon>
                                        <v-icon v-if="item.REGISTRO_CP" v-bind="attrs" v-on="on" color="green lighten-2"
                                            :size="30" class="mr-3" :disabled="loadingtable">
                                            mdi-timer-outline
                                        </v-icon>
                                    </template>
                                    <span>Registro de Cartão de Ponto</span>
                                </v-tooltip>
                            </template>
                            <template v-slot:[`item.ATIVO`]="{ item }">
                                <template>
                                    <v-row justify="center">
                                        <v-switch color="deep-purple lighten-2" v-model="item.ATIVO"
                                            @change="onSwitchChange(item)" v-bind="attrs" v-on="on"></v-switch>
                                    </v-row>
                                </template>
                            </template>
                            <template v-slot:[`item.CAMPO_IDENTIDADE`]="{ item }">
                                <template>
                                    <v-row justify="center">
                                        <v-switch color="deep-purple lighten-2" v-model="item.CAMPO_IDENTIDADE"
                                            @change="onSwitchChange(item)" v-bind="attrs" v-on="on"></v-switch>
                                    </v-row>
                                </template>
                            </template>
                        </v-data-table>
                    </v-card-text>
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
import dayjs from "dayjs";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";
import config from "@/config/store";

export default {
    name: 'modelosregex',
    components: {
        loading, snack
    },
    data: () => ({
        loadingtable: true,
        headersmodelos: [
            { text: "ID", value: "ID" },
            { text: "TIPO", value: "TIPO", align: "center" },
            { text: "REFERÊNCIA", value: "REF_MODELO", align: "center" },
            { text: "CRIADO", value: "CREATED_AT", align: "center" },
            { text: "Ações", value: "actions", sortable: false, align: "center" },
        ],
        modelos: [],
        modelodetalhado: [],
        headerscampos: [
            { text: "CAMPO", value: "CAMPO" },
            { text: "VERBA", value: "VERBA", align: "center" },
            { text: "REGISTRO CP", value: "REGISTRO_CP", align: "center" },
            { text: "ATIVO", value: "ATIVO", align: "center" },
            { text: "IDENTIDADE", value: "CAMPO_IDENTIDADE", align: "center" },
        ],
        camposmodelo: [],
        configsmodelo: [],
        search: '',
        dialogmodelo: false,
        dataSalvarConfigs: [],
        idUsuario: config.user().ID_USUARIO,
    }),
    created() {
        this.listarModelos();
    },
    methods: {
        async listarModelos() {
            this.loadingtable = true;
            this.modelos = [];

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/ativos`,
            })
                .then((res) => {
                    this.modelos = res.data.result;
                    this.loadingtable = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async detalhamentoDoModelo(idmodelo) {
            this.$refs.loading.dialog = true;
            this.modelodetalhado = [];

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${idmodelo}/detalhes`,
            }).then((res) => {
                this.modelodetalhado = res.data.result[0];
                this.camposmodelo = this.modelodetalhado.REGEXES;
            }).catch((err) => {
                console.log(err);
            });

            await this.buscarConfigsModelo(idmodelo);

            this.completarConfigs()
            this.$refs.loading.dialog = false;
            this.dialogmodelo = true;
        },
        completarConfigs() {
            for (const campo of this.camposmodelo) {
                if (this.configsmodelo.length > 0) {
                    const correspondencia = this.configsmodelo.find(config => config.ID_CAMPO === campo.ID && config.ID_MODELO === this.modelodetalhado.ID);

                    if (correspondencia) {
                        campo.ATIVO = correspondencia.ATIVO;
                        campo.CAMPO_IDENTIDADE = correspondencia.CAMPO_IDENTIDADE;
                    } else {
                        campo.ATIVO = false;
                        campo.CAMPO_IDENTIDADE = false;
                    }
                } else {
                    campo.ATIVO = false;
                    campo.CAMPO_IDENTIDADE = false;
                }
            }
        },
        async buscarConfigsModelo(idmodelo) {
            this.configsmodelo = []

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${idmodelo}/configs`,
            }).then((res) => {
                this.configsmodelo = res.data.result;

                if (this.configsmodelo.length == 0) {
                    this.$refs.snackbar.show({
                        message: 'Modelo ainda não foi configurado',
                        status: 'alert',
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async salvarConfigsModelo() {
            this.$refs.loading.dialog = true;
            this.criarDataSalvarConfig()
            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${this.modelodetalhado.ID}/configs`, {
                CONFIGS: this.dataSalvarConfigs
            }).then((res) => {
                this.$refs.loading.dialog = false;
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });

                this.closeDetalhamento()
            }).catch((err) => {
                console.log(err);
            });
        },
        criarDataSalvarConfig() {
            if (this.camposmodelo.length > 0) {
                this.dataSalvarConfigs = []

                for (const campo of this.camposmodelo) {
                    this.dataSalvarConfigs.push({
                        ID_USUARIO: this.idUsuario,
                        ID_MODELO: this.modelodetalhado.ID,
                        ID_CAMPO: campo.ID,
                        DESCRICAO_CAMPO: campo.CAMPO,
                        CAMPO_IDENTIDADE: campo.CAMPO_IDENTIDADE ? true : false,
                        ATIVO: campo.ATIVO ? true : false
                    })
                }
            } else {
                this.$refs.snackbar.show({
                    message: 'Nenhuma informação para salvar.',
                    status: 'alert',
                });
            }
        },
        closeDetalhamento() {
            this.camposmodelo = [];
            this.configsmodelo = [];
            this.dataSalvarConfigs = [];
            this.dialogmodelo = false;
            this.modelodetalhado = [];
        },
        convertData(item) {
            // Verifica se item é uma string e está definido
            if (typeof item === 'string' && item.trim().length > 0) {
                const date = dayjs(item); // Cria um objeto de data com a string
                if (date.isValid()) { // Verifica se a data é válida
                    return date.format("DD/MM/YYYY"); // Formata a data
                }
            }
            // Retorna um valor padrão caso item não seja uma string válida ou seja indefinido
            return "";
        },
    }
}

</script>