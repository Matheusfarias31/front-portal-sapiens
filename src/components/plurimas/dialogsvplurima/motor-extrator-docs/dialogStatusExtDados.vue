<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card max-width="1100px">
                    <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                        <v-toolbar-title>Extrações - Motor Extrator de Dados</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                        <v-toolbar-items class="d-flex align-center my-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="buscarDados()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-clipboard-text-search-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Buscar Dados</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon dark class="mb-2" @click="executarExtDocs()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-plus-box</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar Execução</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="getExecucoesMotorExtDocs()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-update</v-icon>
                                    </v-btn>
                                </template>
                                <span>Atualizar Solicitações</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-data-table :headers="headersExtracoes" :items="extracoes" item-key="ID" :search="search"
                        :loading="loadingtable" class="mb-0 text-no-wrap" fixed-header
                        :footer-props="{ 'items-per-page-options': [-1] }">
                        <template v-slot:[`item.CREATED_AT`]="{ item }">
                            {{ convertData(item.CREATED_AT) }}
                        </template>
                        <template v-slot:[`item.UPDATED_AT`]="{ item }">
                            {{ convertData(item.UPDATED_AT) }}
                        </template>
                        <template v-slot:[`item.TEMPO_DECORRIDO`]="{ item }">
                            {{ calcularTempoDecorrido(item.CREATED_AT, item.UPDATED_AT) }}
                        </template>
                        <template v-slot:[`item.CAMINHO_DOC`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="red lighten-2" :size="26" class="mr-2">
                                        mdi-file-marker-outline
                                    </v-icon>
                                </template>
                                <span>Caminho: {{ item.CAMINHO_DOC }}</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26"
                                        class="mb-2 mr-2" @click="exibirArquivosLidos(item)">
                                        mdi-file-eye
                                    </v-icon>
                                </template>
                                <span>Visualizar Arquivos Extraídos</span>
                            </v-tooltip>
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
            </div>
        </div>
        <execextdocs ref="solicitarexecucao" :zIndex="this.zIndexForOtherDialog" :idplurima="this.idplurima"
            :idusuario="this.idusuario" @atualizarexecextdocs="this.getExecucoesMotorExtDocs">
        </execextdocs>
        <arquivosextraidos ref="arquivosextraidos" :zIndex="this.zIndexForOtherDialog"></arquivosextraidos>
        <dialogBuscarDados ref="buscadados" :zIndex="this.zIndexForOtherDialog"></dialogBuscarDados>
        <loading ref="loading" />
    </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import execextdocs from "@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogExtDados.vue"
import arquivosextraidos from "@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogArquivosExtraidos.vue"
import dialogBuscarDados from '@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogBuscarDados.vue'

export default {
    components: {
        loading, execextdocs, arquivosextraidos, dialogBuscarDados
    },
    props: {
        zIndex: {
            type: Number,
            default: 1000
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
            extracoes: [],
            headersExtracoes: [
                { text: "ID", value: "ID" },
                { text: "SOLICITANTE", value: "NOME_USUARIO", align: "center" },
                { text: "SOLICITAÇÃO", value: "CREATED_AT", align: "center" },
                { text: "ÚLTIMO STATUS", value: "UPDATED_AT", align: "center" },
                { text: "TEMPO DE EXTRAÇÃO", value: "TEMPO_DECORRIDO", align: "center" },
                { text: "STATUS", value: "STATUS_EXTRACOES.STATUS", align: "center" },
                { text: "CAMINHO", value: "CAMINHO_DOC", align: "center" },
                { text: "Ações", value: "actions", sortable: false, align: "center" },
            ],
            loadingtable: false,
            zIndexForOtherDialog: 1000,
        };
    },
    mounted() {
        this.$on('show-dialog', (show) => {
            this.getExecucoesMotorExtDocs();
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {
            this.extracoes = [];
            this.showDialog = false;
        },
        buscarDados(){
            this.$refs.buscadados.idplurima = this.idplurima;
            this.$refs.buscadados.$emit('show-dialog', true);
        },
        executarExtDocs() {
            this.$refs.solicitarexecucao.$emit('show-dialog', true);
        },
        exibirArquivosLidos(item) {
            this.$refs.arquivosextraidos.idextracao = item.ID
            this.$refs.arquivosextraidos.$emit('show-dialog', true);
        },
        async getExecucoesMotorExtDocs() {
            this.loadingtable = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes/origem/PLURIFY/${this.idplurima}`
            ).then((response) => {
                this.extracoes = response.data.result;
                this.loadingtable = false;
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        convertData(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
        calcularTempoDecorrido(datainicio, datafim) {
            const dataInicio = new Date(datainicio);
            const dataFim = new Date(datafim);

            let diferenca = Math.abs(dataFim - dataInicio) / 1000; // diferença em segundos

            let tempoDecorrido;

            if (diferenca < 60) {
                tempoDecorrido = `${Math.floor(diferenca)} segundo(s)`;
            } else if (diferenca < 3600) {
                tempoDecorrido = `${Math.floor(diferenca / 60)} minuto(s)`;
            } else {
                tempoDecorrido = `${Math.floor(diferenca / 3600)} hora(s)`;
            }

            return tempoDecorrido;
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
    background-color: rgba(0, 0, 0, 0.050);
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