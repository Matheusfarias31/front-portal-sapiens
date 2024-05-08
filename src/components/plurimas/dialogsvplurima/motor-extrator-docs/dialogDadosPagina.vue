<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card width="1200px" max-height="1200px" class="no-scroll-card" flat>
                    <v-toolbar color="deep-purple lighten-2" title="dadospagina" dark>
                        <v-toolbar-title> Pagina : {{ this.pagina.NUM_PAGINA }} de {{ this.numpaginas
                            }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>                                                
                        <v-toolbar-items class="d-flex align-center my-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark>
                                        <v-icon v-bind="attrs" v-on="on">mdi-skip-backward-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Página Anterior</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark>
                                        <v-icon v-bind="attrs" v-on="on">mdi-skip-forward-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Próxima Página</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card flat style="overflow-x: hidden;" max-height="750px">


                        <v-card class="mt-2 mr-2 ml-2" color="deep-purple lighten-4" flat max-height="500">
                            <v-toolbar dense color="deep-purple lighten-3" dark>
                                <v-icon dark right>mdi-card-account-details</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-toolbar-title>Campos Identidade</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text class="mt-0 ml-2" style="width: auto;">
                                <v-row justify="start">
                                    <v-col cols="12" sm="6" v-for="(item, index) in camposidentidade" :key="index">
                                        <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat>
                                            <v-card-text class="mt-1" style="white-space: nowrap; width: auto;">
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                                <b>{{ Object.keys(item)[0] }}:</b> {{ item[Object.keys(item)[0]] }}
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <v-card class="mt-2 mr-2 ml-2" color="indigo lighten-4" flat max-height="500">
                            <v-toolbar dense color="indigo lighten-3" dark>
                                <v-icon dark right>mdi-file-document-alert-outline</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-toolbar-title>Outras Informações</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text class="mt-0 ml-2" style="width: auto;">
                                <v-row justify="start">
                                    <v-col cols="12" sm="6" v-for="(item, index) in outrasinfos" :key="index">
                                        <v-card color="indigo lighten-5" class="mt-0" light elevation="0" flat>
                                            <v-card-text class="mt-1" style="white-space: nowrap; width: auto;">
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                                <b>{{ Object.keys(item)[0] }}:</b> {{ item[Object.keys(item)[0]] }}
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <v-card v-if="this.verbas.length > 0" class="mt-2 mr-2 ml-2" color="teal lighten-4" flat>
                            <v-toolbar dense color="teal lighten-3" dark>
                                <v-icon dark right>mdi-cash-multiple</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-toolbar-title>Informações Financeiras</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text class="mt-0 ml-2" style="width: auto;" v-for="(verba, index) in verbas"
                                :key="index">
                                <v-row>
                                    <v-col v-for="(items, indexitems) in verba" :key="indexitems">
                                        <v-card color="teal lighten-5" class="mt-0 mb-0" light elevation="0">
                                            <v-card color="teal lighten-5" class="mt-0 mb-0" light elevation="0"
                                                v-for="(campo, indexcampo) in Object.keys(items)" :key="indexcampo">
                                                <b>{{ campo }}:</b> {{ items[campo] }}
                                            </v-card>
                                        </v-card>

                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <v-card v-if="this.registroscp.length > 0" class="mt-2 mr-2 ml-2" color="teal lighten-4" flat>
                            <v-toolbar dense color="teal lighten-3" dark>
                                <v-icon dark right>mdi-store-clock</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-toolbar-title>Registros de Cartão de Ponto</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text class="mt-0 ml-2" style="width: auto;" v-for="(verba, index) in registroscp"
                                :key="index">
                                <v-row>
                                    <v-col v-for="(items, indexitems) in verba" :key="indexitems">
                                        <v-card color="teal lighten-5" class="mt-0 mb-0" light elevation="0">
                                            <v-card color="teal lighten-5" class="mt-0 mb-0" light elevation="0"
                                                v-for="(campo, indexcampo) in Object.keys(items)" :key="indexcampo">
                                                <b>{{ campo }}:</b> {{ items[campo] }}
                                            </v-card>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                    </v-card>
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
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import snack from "@/components/shared/snackBar.vue";

export default {
    components: {
        loading, snack
    },
    props: {
        zIndex: {
            type: Number,
            default: 1000
        },
        pagina: {
            type: Array
        },
        numpaginas: {
            type: Number
        }    
    },
    data() {
        return {
            showDialog: false,
            configmodelo: [],
            modelo: [],
            dadosIdentidade: [],
            outrasinfos: [],
            verbas: [],
            registroscp: []
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            if (this.pagina.ID_MODELO == "") {
                this.$refs.snackbar.show({
                    message: `Esta página não possui um modelo cadastrado.`,
                    status: 'alert',
                });

            } else {
                this.$refs.loading.dialog = true;
                await this.getModelo();
                await this.getConfigModelo();

                if (this.configmodelo.length > 0) {
                    this.processarDados();
                    this.$refs.loading.dialog = false;
                    this.showDialog = show;
                }
            }
        });
    },
    methods: {
        hideDialog() {
            this.showDialog = false;
        },
        processarDados() {

            const jsonresultadopagina = JSON.parse(this.pagina.RESULTADO_MODELO);

            const dadosverba = jsonresultadopagina.Results.filter(item => "VERBA" in item);
            const verbasativas = dadosverba.filter(verba => {
                const config = this.configmodelo.find(config => config.DESCRICAO_CAMPO === verba.VERBA.NOME_VERBA);
                return !config || config.ATIVO;
            });

            this.verbas = verbasativas;

            const dadosregistrocp = jsonresultadopagina.Results.filter(item => "REGISTRO_CP" in item);
            const registroscpativos = dadosregistrocp.filter(registrocp => {
                const config = this.configmodelo.find(config => config.DESCRICAO_CAMPO === registrocp.VERBA.NOME_VERBA);
                return !config || config.ATIVO;
            });

            this.registroscp = registroscpativos;

            const camposidentidade = jsonresultadopagina.Results.filter(item => {
                const config = this.configmodelo.find(config => config.DESCRICAO_CAMPO === Object.keys(item)[0]);
                return config && config.CAMPO_IDENTIDADE && config.ATIVO;
            });

            this.camposidentidade = camposidentidade

            const outrasinformacoes = jsonresultadopagina.Results.filter(item => {
                const config = this.configmodelo.find(config => config.DESCRICAO_CAMPO === Object.keys(item)[0]);
                return config && !config.CAMPO_IDENTIDADE && config.ATIVO;
            });

            this.outrasinfos = outrasinformacoes;
        },
        async getModelo() {
            this.$refs.loading.dialog = true;
            this.modelo = [];

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${this.pagina.ID_MODELO}/detalhes`,
            }).then((res) => {
                this.modelo = res.data.result[0].REGEXES;
            }).catch((err) => {
                console.log(err);
            });
        },
        async getConfigModelo() {
            this.configmodelo = []

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${this.pagina.ID_MODELO}/configs`,
            }).then((res) => {
                this.configmodelo = res.data.result;

                if (this.configmodelo.length == 0) {
                    this.$refs.snackbar.show({
                        message: 'Modelo ainda não foi configurado.',
                        status: 'alert',
                    });
                } else {
                    this.$refs.snackbar.show({
                        message: 'Modelo carregado com sucesso.',
                        status: true,
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async getPaginasArquivo() {
            this.loadingtable = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}arquivos/${this.idarquivo}/paginas`
            ).then((response) => {
                this.paginas = response.data.result;
                this.loadingtable = false;
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