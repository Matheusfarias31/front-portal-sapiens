<template>
    <div>
        <v-row justify="center">
            <v-dialog z-index="999" ref="pluriDialog" v-model="dialog" fullscreen transition="dialog-bottom-transition">
                <v-card color="deep-purple lighten-5" light class="mt-0">
                    <v-toolbar color="deep-purple lighten-2" dark><v-icon dark
                            right>mdi-folder-information-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Plurima</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon dark @click="hideDialog">
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
                                                <v-btn icon dark @click="showDialogExtDocs()">
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
                                                <v-btn icon dark @click="showDialogAlterarEtapa()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-swap-horizontal</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Alterar Etapa</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogAtividadesEtapa()">
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
                    this.vDetalheEtapa.length > 0 ? this.vDetalheEtapa[0].DATA_CRIACAO :
                        this.vPlurima.DATA_CRIACAO) }}</v-card-text></v-card>
                                        </v-col>
                                    </v-row>

                                    <v-data-table :headers="headersAtividadesEtapas" :items="atividadesEtapaD"
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

                <statusorgdocs ref="statusorgdocs" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario"></statusorgdocs>
                <statusextdocs ref="statusextdocs" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario"></statusextdocs>

                <altstatus ref="alterarstatus" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario"
                    @atualizarstatus="this.getLogStatusPlurima"></altstatus>

                <atividadesetapa ref="atividadesetapa" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario" :idetapa="this.vPlurima.ID_ETAPA"
                    :etapa="this.vPlurima.ETAPA" @atualizaratividades="this.getAtividadesEtapa"></atividadesetapa>

                <alteraretapa ref="alteraretapa" :zIndex="zIndexForOtherDialog" :show-dialogp="false"
                    :idplurima="this.vPlurima.ID" :idusuario="this.idUsuario" :etapaatual="this.vPlurima.ETAPA"
                    @inicializar="this.inicializar"></alteraretapa>

            </v-dialog>
        </v-row>

        <loading ref="loading" />    
        <snack ref="snackbar" />        

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
import snack from "@/components/shared/snackBar.vue";
import axios from "axios";
import dayjs from "dayjs";
import config from "@/config/store";
import altstatus from '@/components/plurimas/dialogsvplurima/dialogAltStatus.vue';
import statusorgdocs from '@/components/plurimas/dialogsvplurima/motor-organizar-docs/dialogStatusOrgDocs.vue';
import statusextdocs from '@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogStatusExtDados.vue';
import atividadesetapa from '@/components/plurimas/dialogsvplurima/atividade-etapa/dialogAtividadeEtapa.vue';
import alteraretapa from '@/components/plurimas/dialogsvplurima/atividade-etapa/dialogProximaEtapa.vue';


export default {
    name: 'plurimaview',
    components: {
        snack, loading, altstatus, statusorgdocs, statusextdocs, atividadesetapa, alteraretapa
    },
    data() {
        return {
            dialogProximaEtapa: false,            
            vPlurima: null,
            vDetalheEtapa: [],
            atividadesEtapaD: [],
            vLogStatusPlurima: null,
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
            Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
            dialog: false
        }
    },
    props: {
        idplurima: { type: Number},         
    },        
    async mounted() {        
        this.$on('show-dialog', async (show) => {               
            await this.inicializar();               
            this.dialog = show;            
        });
        
    },
    methods: {        
        async inicializar() {                     
            await this.getPlurimaID(this.idplurima);            
            await this.getAtividadesEtapa();
            await this.getLogStatusPlurima();                        
        },
        async getPlurimaID(idPlurima) {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${idPlurima}`
            ).then((response) => {
                this.vPlurima = response.data.result[0];
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async getAtividadesEtapa() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}atividades/etapas/plurima/${this.idplurima}/${this.vPlurima.ID_ETAPA}`
            ).then((response) => {
                this.atividadesEtapaD = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        increaseZIndex() {
            this.zIndexForOtherDialog += 1;
        },
        dialogAlterarStatus() {
            this.$refs.alterarstatus.$emit('show-dialog', true);
        },
        dialogExecOrgDocs() {
            this.$refs.execorgdocs.$emit('show-dialog', true);
        },
        showDialogOrgDocs() {
            this.$refs.statusorgdocs.$emit('show-dialog', true);
        },
        showDialogExtDocs() {
            this.$refs.statusextdocs.$emit('show-dialog', true);
        },
        showDialogAtividadesEtapa() {
            this.$refs.atividadesetapa.$emit('show-dialog', true);
        },
        hideDialog() {
            this.$emit('closePlurimaView');  
            this.dialog = false;
        },
        async getLogStatusPlurima() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima/${this.idplurima}`
            ).then((response) => {
                this.vLogStatusPlurima = response.data.log;
                this.vPlurima.ID_STATUS = this.vLogStatusPlurima[0].ID;
                this.vPlurima.DESCRICAO = this.vLogStatusPlurima[0].STATUS;
                this.vPlurima.COLOR_STATUS = this.vLogStatusPlurima[0].COLOR;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },        
        async atualizarDados() {
            this.$emit('atualizardados');
        },
        closeDialogStatusMotorOrg() {
            this.dialogStatusOrgDocs = false;
        },
        showDialogAlterarStatus() {
            this.dialogAlterarStatus = true;
        },
        showDialogAlterarEtapa() {
            this.$refs.alteraretapa.$emit('show-dialog', true);
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
        }
    }
}

</script>