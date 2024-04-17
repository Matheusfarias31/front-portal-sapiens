<template>
    <div>
        <v-row justify="center">
            <v-dialog z-index="999" ref="pluriDialog" v-model="dialog" fullscreen transition="dialog-bottom-transition">
                <v-card color="deep-purple lighten-5" light class="mt-0">
                    <v-toolbar color="deep-purple lighten-2" dark><v-icon dark
                            right>mdi-folder-information-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>{{ toolbarTittle
                            }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon dark @click="closeDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card class="mt-2 mr-2 ml-2" color="deep-purple lighten-4" flat height="320">
                        <v-toolbar dense color="deep-purple lighten-3" dark><v-icon dark
                                right>mdi-information-variant-box-outline</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Informações
                                Gerais</v-toolbar-title></v-toolbar>
                        <v-card-text class="mt-0 ml-2">
                            <v-row justify="start">
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-account-circle</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Solicitante: {{
                this.vPlurima.NOME_SOLICITANTE
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-domain</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Cliente: {{
                    this.vPlurima.NOME_CLIENTE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-bell-outline</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Fase: {{
                    this.vPlurima.FASE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-briefcase-outline</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Trabalho: {{
                    this.vPlurima.TRABALHO
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-account-tie</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Responsável: {{
                    this.vPlurima.TIME_PLURIMAS ? 'TIME PLÚRIMAS' :
                        this.vPlurima.NOME_SOLICITANTE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-calendar-range</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Data de Solicitação: {{
                    convertData(this.vPlurima.DATA_CRIACAO)
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="getColorPrazo(this.vPlurima.PRAZO_ENTREGA)" class="mt-0" light
                                        elevation="0" flat height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-clipboard-text-clock</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>PRAZO: {{
                convertData(this.vPlurima.PRAZO_ENTREGA)
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="getColorEtapa(this.vPlurima)" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-step-forward</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Etapa: {{
                this.vPlurima.ETAPA
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="this.vPlurima.COLOR_STATUS" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-list-status</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Status: {{
                this.vPlurima.DESCRICAO
            }}</v-card-text></v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-row justify="center" class="mt-2 mr-0 ml-0">
                        <template>
                            <v-col cols="12" sm="6" md="6" class="mt-0 mr-0 ml-0">
                                <v-card class="mt-0" color="deep-purple lighten-4" flat height="400">
                                    <v-toolbar dense color="deep-purple lighten-3" dark>
                                        <v-icon dark right>mdi-timeline-check-outline</v-icon>
                                        <v-divider class="mx-4" inset vertical></v-divider>
                                        <v-toolbar-title>Status da Atividade</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-toolbar-items>
                                            <v-btn icon dark @click="dialogAlterarStatus()">
                                                <v-icon>mdi-tag-edit-outline</v-icon>
                                            </v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>
                                    <v-card-text class="mt-3 ml-2">
                                        <v-card class="mt-0" color="deep-purple lighten-4" flat height="300"
                                            style="overflow-x: hidden;">
                                            <v-row justify="center">
                                                <v-col cols="12" sm="11" md="11">
                                                    <v-timeline align-top dense>
                                                        <v-timeline-item v-for="item in this.vLogStatusPlurima"
                                                            :key="item.ID" :color="item.COLOR" small>
                                                            <v-row justify="start">
                                                                <v-col cols="10">
                                                                    <strong>{{ item.STATUS }}</strong>
                                                                    <div class="text-caption mb-0">
                                                                        {{ convertData(item.DATA_CRIACAO) }}
                                                                    </div>
                                                                    <div class="text-caption mb-1">
                                                                        {{ item.OBSERVACAO }}
                                                                    </div>
                                                                </v-col>
                                                            </v-row>
                                                        </v-timeline-item>
                                                    </v-timeline>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </template>

                        <v-col cols="12" sm="6" md="6" class="mt-0 mr-0 ml-0">
                            <v-card class="mt-0" color="deep-purple lighten-4" flat height="400">
                                <v-toolbar dense color="deep-purple lighten-3" dark><v-icon dark right>mdi-run</v-icon>
                                    <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Andamento da
                                        etapa
                                        atual
                                        ({{ this.vPlurima.ETAPA }})</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                                    <v-toolbar-items>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogOrgDocs()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-tray-full</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Organizar Docs</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogExtratorDocs()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-database-cog</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Extrator de Dados</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark>
                                                    <v-icon v-bind="attrs" v-on="on">mdi-timer-cog</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Calcular CP</span>
                                        </v-tooltip>
                                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark>
                                                    <v-icon v-bind="attrs" v-on="on">mdi-skip-forward</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Avançar Etapa</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark>
                                                    <v-icon v-bind="attrs" v-on="on">mdi-note-edit-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Editar Atividades</span>
                                        </v-tooltip>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-card-text class="mt-0 ml-2 mr-2">
                                    <v-row justify="start">
                                        <v-col cols="12" sm="12" md="12">
                                            <v-card color="deep-purple lighten-5" class="mt-0 mr-2" light elevation="0"
                                                flat height="60"><v-card-text class="mt-1"><v-icon light
                                                        right>mdi-timer-play-outline</v-icon><v-divider class="mx-2"
                                                        inset vertical></v-divider>Início da etapa atual: {{
                convertData(
                    this.detalheEtapa.length > 0 ? this.detalheEtapa[0].DATA_CRIACAO :
                        this.vPlurima.DATA_CRIACAO) }}</v-card-text></v-card>
                                        </v-col>
                                    </v-row>

                                    <v-data-table :headers="headersAtividadesEtapas" :items="vDetalheEtapa"
                                        item-key="ID" class="mt-3 mr-2 mb-16 text-no-wrap" height="200" fixed-header
                                        :footer-props="{ 'items-per-page-options': [-1] }">
                                        <template v-slot:[`item.DATA_CRIACAO`]="{ item }">
                                            {{ convertData(item.DATA_CRIACAO) }}
                                        </template>
                                        <template v-slot:[`item.ATIVO`]="{ item }">
                                            <v-icon v-if="item.ATIVO"
                                                color="deep-purple lighten-2">mdi-check-circle</v-icon>
                                            <v-icon v-if="!item.ATIVO" color="red lighten-2">mdi-alert-circle</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>

                <statusorgdocs ref="statusorgdocs" :zIndex="zIndexForOtherDialog" :show-dialogp="false" :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario"></statusorgdocs>

                <v-dialog v-model="dialogProximaEtapa" persistent width="800px">
                    <v-form>
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarEtapa" dark>
                                <v-toolbar-title>Próxima Etapa</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-row justify="center">
                                    <v-col>
                                        <v-container class="d-flex justify-center align-center">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="lime lighten-1" dark><v-icon
                                                            left>mdi-check-decagram</v-icon>VALIDAÇÃO</v-btn>
                                                </template>
                                                <span>Validação da Demanda</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="light-green lighten-1" dark><v-icon
                                                            left>mdi-account-group</v-icon>PRIMEIRA</v-btn>
                                                </template>
                                                <span>Listagem de Envolvidos</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="green lighten-1" dark><v-icon
                                                            left>mdi-database-eye</v-icon>SEGUNDA</v-btn>
                                                </template>
                                                <span>Validação de Dados</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="teal lighten-1" dark><v-icon
                                                            left>mdi-file-document-multiple</v-icon>TERCEIRA</v-btn>
                                                </template>
                                                <span>Cálculos Individuais</span>
                                            </v-tooltip>
                                        </v-container>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row justify="center" class="mt-3">
                                    <p>Deseja executar um motor antes? Selecione um motor abaixo:</p>
                                    <v-container class=" mt-0 d-flex justify-center align-center">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="cyan darken-3"
                                                    dark @click="showDialogOrgDocs()">
                                                    <v-icon left>mdi-tray-full</v-icon>Organizar Docs
                                                </v-btn>
                                            </template>
                                            <span>Organizar Documentos da Plúrima</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="teal darken-3"
                                                    dark>
                                                    <v-icon left>mdi-database-cog</v-icon>Extração de Dados
                                                </v-btn>
                                            </template>
                                            <span>Realizar Extração dos Dados</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="brown darken-3"
                                                    dark>
                                                    <v-icon left>mdi-timer-cog</v-icon>Calcular Pontos
                                                </v-btn>
                                            </template>
                                            <span>Calcular Cartôes de Ponto</span>
                                        </v-tooltip>
                                    </v-container>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="closeDialogProximaEtapa">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

                <altstatus ref="alterarstatus" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario"
                    @atualizarstatus="this.getLogStatusPlurima"></altstatus>                

                <v-dialog v-model="dialogExtratorDocs" persistent width="600px">
                    <v-form @submit.prevent="solicitarExecExtratorDocs">
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                                <v-toolbar-title>Executar Extrator de Documentos</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.NOTIFICAR_USUARIO"
                                                label="Notificar Usuário"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.NOVOS_ARQUIVOS"
                                                label="Novos Arquivos"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.PRIORIDADE" label="Prioridade"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.MULTIPLOS_DOCS"
                                                label="Múltiplos Documentos"></v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-textarea required class="mt-2 mb-0 text-left align-start"
                                        label="Caminho dos Documentos"
                                        placeholder="Caminho dos arquivos (Máx. 300 caracteres)" outlined
                                        maxlength="300" v-model="extracao.CAMINHO_DOC"></v-textarea>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn type="submit" color="deep-purple darken-1" text>
                                    Salvar
                                </v-btn>
                                <v-btn color="red darken-1" text @click="closeDialogExtratorDocs">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

            </v-dialog>
        </v-row>

        <loading ref="loading" />
        <snack ref="snackbar" />
        <loadingextrator ref="loadingextrator" />

    </div>
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
import loading from "@/components/shared/loading.vue";
import loadingextrator from "@/components/shared/loadingextrator.vue"
import snack from "@/components/shared/snackBar.vue";
import axios from "axios";
import dayjs from "dayjs";
import config from "@/config/store";
import altstatus from '@/components/plurimas/dialogsvplurima/dialogAltStatus.vue';
import statusorgdocs from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogStatusOrgDocs.vue';

export default {
    name: 'plurimaview',
    components: {
        snack, loading, loadingextrator, altstatus, statusorgdocs
    },
    data() {
        return {
            dialogProximaEtapa: false,            
            vPlurima: this.plurimaProp,
            vDetalheEtapa: this.detalheEtapa,
            vLogStatusPlurima: this.logStatus,                                
            extracao: { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } },            
            headersAtividadesEtapas: [
                { text: "Atividade", value: "ATIVIDADE" },
                { text: "Responsável", value: "NOME", align: "center" },
                { text: "Início", value: "DATA_CRIACAO", align: "center" },
                { text: "Ativo", value: "ATIVO", align: "center" },
            ],
            zIndexForOtherDialog: 1000,
            dialogExtratorDocs: false,
            idUsuario: config.user().ID_USUARIO,
            nomeUsuario: config.user().NOME,
            emailUsuario: config.user().EMAIL,
            Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017")
        }
    },
    props: {
        show: Boolean,
        plurimaProp: Array,
        detalheEtapa: Array,
        logStatus: Array
    },
    computed: {
        dialog: {
            get() {
                return this.$props["show"];
            },
            set(value) {
                this.$emit("update:show", value);
            },
        },
        toolbarTittle() {
            return `Plúrima: ${this.vPlurima.NUMERO_PROCESSO} | ID: ${this.vPlurima.ID}`;
        }
    },
    watch: {
        show(newValue) {
            this.dialog = newValue;
        },
        plurimaProp(newValue) {
            if (newValue) {
                this.vPlurima = newValue;
            }
        },
        dialogProximaEtapa(newValue) {
            if (newValue) {
                this.dialogProximaEtapa = newValue;
            }
        },
        detalheEtapa(newValue) {
            if (newValue) {
                this.vDetalheEtapa = newValue;
            }
        },
        logStatus(newValue) {
            if (newValue) {
                this.vLogStatusPlurima = newValue;
            }
        }
    },
    async mounted() {
        await this.getStatusAtivos();
    },
    methods: {        
        increaseZIndex() {
            this.zIndexForOtherDialog += 1;
        },
        dialogAlterarStatus() {
            this.$refs.alterarstatus.$emit('show-dialog', true);
        },
        dialogExecOrgDocs() {
            this.$refs.execorgdocs.$emit('show-dialog', true);
        },
        showDialogOrgDocs(){
            this.$refs.statusorgdocs.$emit('show-dialog', true);
        },
        hideDialog() {
            this.showDialog = false;
        },
        async getLogStatusPlurima() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima/${this.vPlurima.ID}`
            ).then((response) => {
                this.vLogStatusPlurima = response.data.log;
                this.vPlurima.ID_STATUS = this.vLogStatusPlurima[0].ID;
                this.vPlurima.DESCRICAO = this.vLogStatusPlurima[0].STATUS;
                this.vPlurima.COLOR_STATUS = this.vLogStatusPlurima[0].COLOR;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },                       
        closeDialogStatusMotorOrg() {
            this.dialogStatusOrgDocs = false;
        },
        showDialogAlterarStatus() {
            this.dialogAlterarStatus = true;
        },
        showDialogProximaEtapa() {
            this.$refs.alertComponent.exibirAlerta('Mensagem de exemplo');
        },
        closeDialogProximaEtapa() {
            this.dialogProximaEtapa = false;
        },                                          
        convertData(item) {
            if (item && typeof item === 'string') {
                if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
                    return dayjs(item.replace("T", " ").replace("Z", "")).format(
                        "DD/MM/YYYY"
                    );
                }
            }
        },
        getColorPrazo(item) {
            const currentDate = dayjs().startOf('day');
            const givenDate = dayjs(item).startOf('day');
            const marginDate = currentDate.add(5, 'day');

            if (givenDate.isBefore(currentDate)) {
                return "red lighten-2";
            } else if (givenDate.isBefore(marginDate)) {
                return "amber lighten-2"
            } else {
                return "green lighten-2";
            }
        },
        getColorEtapa(item) {
            if (item.ETAPA == "VALIDAÇÃO") return "lime lighten-1";
            if (item.ETAPA == "PRIMEIRA") return "light-green lighten-1";
            if (item.ETAPA == "SEGUNDA") return "green lighten-1";
            if (item.ETAPA == "TERCEIRA") return "teal lighten-1";
        },
        closeDialog() {
            this.docFisico = false;
            this.prazoEntrega = '';
            this.link = '';
            this.selectedCliente = { NomeCliente: null, idCliente: null };
            this.selecectFase = { FASE: null, ID: null };
            this.selectedTrabalho = { TRABALHO: null, ID: null };
            this.timePlurimas = false;
            this.numeroProcesso = '';
            this.observacaoStatus = '';
            this.selectedStatus = { ID: null, DESCRICAO: null }
            this.$emit("closePlurimaView");
        },
        convertData2(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
        reset() {
            this.$refs.pluriDialog.reset();
        },
        showDialogExtratorDocs() {
            this.dialogExtratorDocs = true;
        },
        closeDialogExtratorDocs() {
            this.dialogExtratorDocs = false;
            this.extracao = { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } };
            this.caminhoOrgDOcs = '';
        },
        async solicitarExecExtratorDocs() {
            this.$refs.loading.dialog = true;

            if (this.extracao.CAMINHO_DOC == "") {
                this.$refs.snackbar.show({
                    message: "Por favor, informe um caminho.",
                    status: false,
                });
                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes`, {
                ORIGEM: "PLURIFY",
                ID_REF_ORIGEM: this.vPlurima.ID,
                ID_USUARIO: this.idUsuario,
                EMAIL_USUARIO: this.emailUsuario,
                NOME_USUARIO: this.nomeUsuario,
                CAMINHO_DOC: this.extracao.CAMINHO_DOC,
                CONFIGS: {
                    NOTIFICAR_USUARIO: this.extracao.CONFIGS.NOTIFICAR_USUARIO,
                    NOVOS_ARQUIVOS: this.extracao.CONFIGS.NOVOS_ARQUIVOS,
                    PRIORIDADE: this.extracao.CONFIGS.PRIORIDADE,
                    MULTIPLOS_DOCS: this.extracao.CONFIGS.MULTIPLOS_DOCS
                }
            }).then((response) => {
                this.selectedStatus.ID = '1017';
                this.observacaoStatus = `Motor de Extrair Dados Solicitado. ID da Extração: ${response.data.idextracao}`;
                this.selectedStatus.DESCRICAO = 'AGUARD. MOTOR'
                this.selectedStatus.COLOR = 'blue lighten-1';
                this.$refs.loading.dialog = false;

                this.$refs.snackbar.show({
                    message: `${response.data.result} ID: ${response.data.idextracao}`,
                    status: response.data.status,
                });

                this.saveStatus();
                this.closeDialogExtratorDocs();
                this.closeDialogProximaEtapa();
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

</script>