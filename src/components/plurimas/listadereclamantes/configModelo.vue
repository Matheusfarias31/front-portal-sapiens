<template>
    <div>
        <v-dialog v-model="showDialog" persistent max-width="450px">
            <v-form>
                <v-card class="no-scroll-card" flat style="overflow-x: hidden;">
                    <v-toolbar color="deep-purple lighten-2" title="detalhemodelo" dark>
                        <v-toolbar-title>Campos Disponíveis</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <template>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" icon dark>
                                            <v-icon>mdi-content-save-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Salvar Configuração</span>
                                </v-tooltip>
                            </template>
                            <template>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" icon dark @click="hideDialog">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Fechar Sem Salvar</span>
                                </v-tooltip>
                            </template>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text class="mt-0 ml-0">
                        <v-data-table :headers="headerscampos" :items="camposModelo" class="text-no-wrap"
                            :items-per-page="30" :loading="loadingTable">
                        </v-data-table>
                        <template v-slot:[`item.ATIVO`]="{ item }">
                            <template>
                                <v-row justify="center">
                                    <v-switch color="deep-purple lighten-2" v-model="item.ATIVO"
                                        @change="onSwitchChange(item)" v-bind="attrs" v-on="on"></v-switch>
                                </v-row>
                            </template>
                        </template>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
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
import axios from "axios";
import dayjs from "dayjs";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: 'configmodelo',
    props: {
        show: Boolean,
        idmodelo: { type: Number },
    },
    components: {
        loading, snack
    },
    data() {
        return {
            showDialog: false,
            loadingTable: true,
            camposModelo: [],
            headerscampos: [
                { text: "CAMPO", value: "CAMPO" },
                { text: "ATIVO", value: "ATIVO", align: "center" },
            ]
        }
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            await this.inicializar();
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {
            this.showDialog = false;
        },
        async salvarLista() {
            console.log(this.nomelista)
            console.log(this.idUsuario);
            console.log(this.nomeUsuario);
            console.log(this.idplurima);
            console.log(this.emailUsuario);
        },
        async inicializar() {
            this.loadingTable = true;
            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${this.idmodelo}/detalhes`,
            }).then((res) => {
                this.modelodetalhado = res.data.result[0];
                this.camposModelo = this.modelodetalhado.REGEXES;
                this.loadingTable = false;
            }).catch((err) => {
                console.log(err);
            });
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