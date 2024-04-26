<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card width="950px" flat>
                    <v-toolbar color="deep-purple lighten-2" title="motororganizardocumentos" dark>
                        <v-toolbar-title>Motor - Organizar Documentos</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                        <v-toolbar-items class="d-flex align-center my-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="dialogExecOrgDocs">
                                        <v-icon v-bind="attrs" v-on="on">mdi-plus-box</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar Execução</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="getExecucoesMotorOrgDocs(idplurima)">
                                        <v-icon v-bind="attrs" v-on="on">mdi-update</v-icon>
                                    </v-btn>
                                </template>
                                <span>Atualizar Solicitações</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-spacer></v-spacer>
                    <v-data-table :headers="headersExecucoesOrgDocs" :items="execucoesOrgDocs" item-key="ID"
                        :search="search" :loading="loadingExecOrgDocs" class="mb-0 text-no-wrap" fixed-header
                        :footer-props="{ 'items-per-page-options': [-1] }">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26"
                                        @click="dialogArquivosLidos(item.ID)" class="mr-2">
                                        mdi-file-eye
                                    </v-icon>
                                </template>
                                <span>Arquivos Lidos</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="green lighten-1" :size="26"
                                        @click="dialogArquivosEditaveis(item.ID)" class="mr-2">
                                        mdi-file-document-check
                                    </v-icon>
                                </template>
                                <span>Arquivos Gerados - Editáveis</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="red lighten-1" :size="26"
                                        @click="dialogArquivosNEditaveis(item.ID)" class="mr-2">
                                        mdi-file-document-alert
                                    </v-icon>
                                </template>
                                <span>Arquivos Gerados - Não Editáveis</span>
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
            </div>
        </div>

        <arquivosneditaveis ref="arquivosneditaveis" :idsolicitacao="this.idsolicitacao" :zIndex="zIndexForOtherDialog"
            :show-dialogp="false" :idplurima="this.idplurima" :idusuario="this.idusuario"></arquivosneditaveis>
        <arquivoseditaveis ref="arquivoseditaveis" :idsolicitacao="this.idsolicitacao" :zIndex="zIndexForOtherDialog"
            :show-dialogp="false" :idplurima="this.idplurima" :idusuario="this.idusuario"></arquivoseditaveis>
        <arquivoslidos ref="arquivoslidos" :idsolicitacao="this.idsolicitacao" :zIndex="zIndexForOtherDialog"
            :show-dialogp="false" :idplurima="this.idplurima" :idusuario="this.idusuario"></arquivoslidos>
        <execorgdocs ref="execorgdocs" :zIndex="zIndexForOtherDialog" :show-dialogp="false" :idplurima="this.idplurima"
            :idusuario="this.idusuario" @atualizarexecorgdocs="this.getExecucoesMotorOrgDocs"></execorgdocs>
        <loading ref="loading" />
    </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import execorgdocs from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogOrgDocs.vue';
import arquivoslidos from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogArquivosLidos.vue';
import arquivoseditaveis from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogArquivosEditaveis.vue';
import arquivosneditaveis from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogArquivosNEditaveis.vue';

export default {
    components: {
        loading, execorgdocs, arquivoslidos, arquivoseditaveis,arquivosneditaveis
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
            headersExecucoesOrgDocs: [
                { text: "ID", value: "ID" },
                { text: "SOLICITANTE", value: "NOME", align: "center" },
                { text: "STATUS", value: "STATUS_MOTOR", align: "center" },
                { text: "DATA", value: "CREATED_AT", align: "center" },
                { text: "AÇÕES", value: "actions", sortable: false, align: "center" },
            ],
            loadingExecOrgDocs: false,
            execucoesOrgDocs: [],
            zIndexForOtherDialog: 1000,
            idsolicitacao: null
        };
    },
    mounted() {
        this.$on('show-dialog', (show) => {
            this.$refs.loading.dialog = true;
            this.getExecucoesMotorOrgDocs(this.idplurima);
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {
            this.execucoesOrgDocs = [];
            this.showDialog = false;
        },
        dialogExecOrgDocs() {
            this.$refs.execorgdocs.$emit('show-dialog', true);
        },
        dialogArquivosLidos(idsolicitacao) {
            this.$refs.arquivoslidos.idsolicitacao = idsolicitacao;
            this.$refs.arquivoslidos.$emit('show-dialog', true);
        },
        dialogArquivosEditaveis(idsolicitacao) {
            this.$refs.arquivoseditaveis.idsolicitacao = idsolicitacao;
            this.$refs.arquivoseditaveis.$emit('show-dialog', true);
        },
        dialogArquivosNEditaveis(idsolicitacao) {
            this.$refs.arquivosneditaveis.idsolicitacao = idsolicitacao;
            this.$refs.arquivosneditaveis.$emit('show-dialog', true);
        },
        async getExecucoesMotorOrgDocs() {
            this.loadingExecOrgDocs = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}solicitacoes/plurimas/${this.idplurima}`
            ).then((response) => {
                console.log(response.data.result);
                this.execucoesOrgDocs = response.data.result;
                this.loadingExecOrgDocs = false;
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