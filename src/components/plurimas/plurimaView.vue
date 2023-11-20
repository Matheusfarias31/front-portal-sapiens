<template>
    <div>
        <v-row justify="center">
            <v-dialog ref="pluriDialog" v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
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
                                                right>mdi-numeric</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Número do Processo: {{
                                                    this.vPlurima.NUMERO_PROCESSO
                                                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-account-tie</v-icon><v-divider class="mx-2" inset
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
                                    <v-card :color="getColorEtapa(this.vPlurima)" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-step-forward</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Etapa: {{
                                                    this.vPlurima.ETAPA
                                                }}<v-chip class="ml-4 mt-0 mr-0 mb-0" :color="getColorEtapa(this.vPlurima)"
                                                dark><v-icon light
                                                    right>mdi-timeline-clock-outline</v-icon></v-chip></v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="getColorStatus(this.vPlurima)" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-list-status</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Status: {{
                                                    this.vPlurima.DESCRICAO
                                                }}<v-chip class="ml-4 mt-0" :color="getColorStatus(this.vPlurima)" dark><v-icon
                                                    light
                                                    right>mdi-timeline-clock-outline</v-icon></v-chip></v-card-text></v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'plurimaview',
    data: () => ({
        vPlurima: this.plurimaProp,
        teste: this.show
    }),
    props: {
        show: Boolean,
        plurimaProp: Array
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
    mounted: {
        executeConsole() {
            console.log(this.vPlurima.ID);
        }
    },
    watch: {
        show(newValue) {
            this.dialog = newValue;
        },
        plurimaProp(newValue) {
            this.vPlurima = newValue;
        }
    },
    methods: {
        getColorStatus(item) {
            if (item.DESCRICAO == "EM ABERTO") return "deep-purple lighten-3";
            if (item.DESCRICAO == "EM ANÁLISE") return "orange lighten-3";
            if (item.DESCRICAO == "AGUARDANDO CLIENTE") return "orange lighten-4";
            if (item.DESCRICAO == "AGUARDANDO SOLICITANTE") return "blue-grey lighten-3";
            if (item.DESCRICAO == "AGUARDANDO OP") return "red lighten-3";
            if (item.DESCRICAO == "EM ANDAMENTO") return "indigo lighten-3";
            if (item.DESCRICAO == "CANCELADA") return "green lighten-4";
            if (item.DESCRICAO == "RECUSADA") return "green lighten-4";
            if (item.DESCRICAO == "FINALIZADA") return "green lighten-4";
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