<template>
    <div>
        <v-row justify="center">
            <v-dialog ref="pluriDialog" v-model="dialog" fullscreen transition="dialog-bottom-transition">
                <v-card color="deep-purple lighten-5" light class="mt-0">
                    <v-toolbar color="deep-purple lighten-2" dark><v-icon dark right>mdi-folder-information-outline</v-icon>
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
                                    <v-card :color="getColorStatus(this.vPlurima.DESCRICAO)" class="mt-0" light
                                        elevation="0" flat height="60"><v-card-text class="mt-1"><v-icon light
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
                                    </v-toolbar>
                                    <v-card-text class="mt-3 ml-2">
                                        <v-card class="mt-0" color="deep-purple lighten-4" flat height="300" style="overflow-x: hidden;">
                                            <v-row justify="center">
                                                <v-col cols="12" sm="11" md="11">
                                                    <v-timeline align-top dense>
                                                        <v-timeline-item v-for="item in this.vLogStatusPlurima"
                                                            :key="item.ID" :color="getColorStatus(item.STATUS)" small>
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
                                    <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Andamento da etapa
                                        atual
                                        ({{ this.vPlurima.ETAPA }})</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn icon dark>
                                        <v-icon>mdi-note-edit-outline</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                                    </v-toolbar>
                                <v-card-text class="mt-0 ml-2 mr-2">
                                    <v-row justify="start">
                                        <v-col cols="12" sm="12" md="12">
                                            <v-card color="deep-purple lighten-5" class="mt-0 mr-2" light elevation="0" flat
                                                height="60"><v-card-text class="mt-1"><v-icon light
                                                        right>mdi-timer-play-outline</v-icon><v-divider class="mx-2" inset
                                                        vertical></v-divider>Início da etapa atual: {{ convertData(
                                                            this.detalheEtapa.length > 0 ? this.detalheEtapa[0].DATA_CRIACAO :
                                                                this.vPlurima.DATA_CRIACAO) }}</v-card-text></v-card>
                                        </v-col>
                                    </v-row>

                                    <v-data-table :headers="headersAtividadesEtapas" :items="vDetalheEtapa" item-key="ID"
                                        class="mt-3 mr-2 mb-16 text-no-wrap" height="200" fixed-header
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
            </v-dialog>
        </v-row>
    </div>
</template>

<style scoped>
  /* Estilizando o scrollbar no WebKit (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 6px; /* Largura do scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #EDE7F6; /* Cor de fundo da área do scrollbar não preenchida */
  }

  ::-webkit-scrollbar-thumb {
    background: #B39DDB;
    border-radius: 0px; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #B39DDB; /* Cor do botão do scrollbar ao passar o mouse por cima */
  }
</style>

<script>

import dayjs from "dayjs";

export default {
    name: 'plurimaview',
    data() {
        return {
            vPlurima: this.plurimaProp,
            vDetalheEtapa: this.detalheEtapa,
            vLogStatusPlurima: this.logStatus,
            headersAtividadesEtapas: [
                { text: "Atividade", value: "ATIVIDADE" },
                { text: "Responsável", value: "NOME", align: "center" },
                { text: "Início", value: "DATA_CRIACAO", align: "center" },
                { text: "Ativo", value: "ATIVO", align: "center" },
            ]
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
    methods: {
        convertData(item) {
            if (item && typeof item === 'string') {
                if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
                    return dayjs(item.replace("T", " ").replace("Z", "")).format(
                        "DD/MM/YYYY"
                    );
                }
            }
        },
        getColorStatus(item) {
            if (item == "EM ABERTO") return "deep-purple lighten-3";
            if (item == "EM ANÁLISE") return "orange lighten-3";
            if (item == "AGUARDANDO CLIENTE") return "orange lighten-4";
            if (item == "AGUARDANDO SOLICITANTE") return "blue-grey lighten-3";
            if (item == "AGUARDANDO OP") return "red lighten-3";
            if (item == "EM ANDAMENTO") return "indigo lighten-3";
            if (item == "CANCELADA") return "green lighten-4";
            if (item == "RECUSADA") return "green lighten-4";
            if (item == "FINALIZADA") return "green lighten-4";
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
            this.$emit("closePlurimaView");
        },
        reset() {
            this.$refs.pluriDialog.reset();
        }
    }
}

</script>