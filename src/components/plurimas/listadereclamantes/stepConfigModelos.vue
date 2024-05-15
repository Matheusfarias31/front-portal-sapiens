<template>
    <v-div>
        <v-stepper-content step="1">

            <v-form>
                <v-card class="mb-12" height="450px" style="overflow-x: hidden; border: none;" outlined>

                    <v-row justify="center">
                        <v-card class="mt-2 mr-2 ml-2 center" color="teal lighten-4" flat min-width="950px">
                            <v-toolbar dense color="teal lighten-3" dark><v-icon dark right>mdi-regex</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Modelos de Regex
                                    Utilizados</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-col v-for="(items, indexitems) in modelosutilizados" :key="indexitems">
                                <v-row justify="start">
                                    <v-col cols="12" sm="12" md="12">
                                        <v-card color="teal lighten-5" class="mt-0 mb-a" light elevation="0"
                                            height="60">
                                            <v-card-text class="d-flex justify-space-between align-center mt-0 mb-0">
                                                <div>
                                                    <v-icon light right>mdi-regex</v-icon>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                    <b>ID Modelo:</b> {{ items.ID_MODELO }} <v-divider class="mx-2"
                                                        inset vertical></v-divider>
                                                    <b>Tipo de
                                                        Modelo:</b> {{ items.TIPO_MODELO }}
                                                    <v-divider class="mx-2" inset vertical></v-divider> <b>Referência do
                                                        Modelo:</b> {{
                                items.REF_MODELO }}
                                                </div>
                                                <v-icon dark color="teal lighten-3"
                                                    @click="showCamposModelo(items)">mdi-cog-outline</v-icon>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-card>
                    </v-row>


                    <v-row justify="center">
                        <v-card class="mt-2 mr-2 ml-2 mb-3 center" color="purple lighten-4" flat min-width="950px">
                            <v-toolbar dense color="purple lighten-2" dark><v-icon dark
                                    right>mdi-content-save-cog-outline</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Configuração
                                    Atual</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-col v-if="configuracaoatual.CONFIG_MODELOS.length == 0" cols="12" sm="12" md="12">
                                <v-card color="purple lighten-5" class="mt-0 mb-a" light elevation="0" height="60">
                                    <v-card-subtitle v-if="configuracaoatual.CONFIG_MODELOS.length == 0"
                                        class="mt-0 mb-0">
                                        Nenhuma configuração realizada.
                                    </v-card-subtitle>
                                </v-card>
                            </v-col>
                            <v-col v-for="(items, indexitems) in configuracaoatual.CONFIG_MODELOS" :key="indexitems">
                                <v-row justify="start">
                                    <v-col cols="12" sm="12" md="12">
                                        <v-card color="purple lighten-5" class="mt-0 mb-1" light elevation="0"
                                            min-height="60">
                                            <v-card-text class="d-flex justify-space-between align-center mt-0 mb-0">
                                                <div>
                                                    <v-icon light right>mdi-regex</v-icon>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                    <b>ID Modelo:</b> {{ items.ID_MODELO }}
                                                </div>
                                            </v-card-text>
                                            <v-card-text class="d-flex justify-space-between align-center mt-0 mb-0">
                                                <div>
                                                    <v-icon light right>mdi-select</v-icon>
                                                    <v-divider class="mx-2" inset vertical></v-divider>
                                                    <b>CAMPOS SELECIONADOS:</b> {{ camposSelecionadosItem(items) }}
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-card>
                    </v-row>
                    <v-row class="justify-end mr-0 mt-3">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn height="40" width="300" dark color="blue-grey lighten-2" v-bind="attrs"
                                    v-on="on">
                                    Salvar e continuar<v-icon :size="25" right
                                        dark>mdi-content-save-move-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Salvar e continuar para a próxima etapa.</span>
                        </v-tooltip>
                    </v-row>
                </v-card>


            </v-form>

            <configmodelo :idmodelo="idmodeloSelecionado" :camposconfigurados="camposConfigurados" ref="configmodeloc"
                @update-config="atualizarConfiguracaoAtual" />
            <loading ref="loading" />
            <snack ref="snackbar" />
            
        </v-stepper-content>
        
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
import configmodelo from "../listadereclamantes/configModelo.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: 'stepconfigmodelos',
    components: { loading, configmodelo, snack },
    props: {
        idplurima: { type: Number },
        idlista: { type: Number }
    },
    data() {
        return {
            modelosutilizados: [],
            localIdLista: this.idlista,
            configuracaoatual: { ID_LISTA: this.localIdLista, CONFIG_MODELOS: [] },
            idmodeloSelecionado: null,
            camposConfigurados: null,
            lista: null
        };
    },
    mounted() {
        this.$refs.loading.dialog = true;
        this.configuracaoatual = { ID_LISTA: this.localIdLista, CONFIG_MODELOS: [] };
        this.getmodelosutilizados()
            .then(() => {
                this.getConfigsLista();
            });
        this.$refs.loading.dialog = false;
    },
    watch: {
        idlista(newValue) {
            this.localIdLista = newValue;
            this.localIdLista.ID_MODELO = newValue;
            this.getConfigsLista()
        }
    },
    methods: {
        camposSelecionadosItem(item) {
            let camposAtivos = item.CAMPOS.filter(c => c.ATIVO).map(c => c.CAMPO);
            let texto = camposAtivos.join(' ; ');
            return texto;
        },
        async atualizarConfiguracaoAtual(dados) {
            this.$refs.loading.dialog = true;

            if (this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === dados.ID_MODELO)) {
                dados.CAMPOS.forEach(campo => {
                    if (this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === dados.ID_MODELO).CAMPOS.find(c => c.ID_CAMPO === campo.ID_CAMPO)) {
                        this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === dados.ID_MODELO).CAMPOS.find(c => c.ID_CAMPO === campo.ID_CAMPO).ATIVO = campo.ATIVO
                    } else {
                        this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === dados.ID_MODELO).CAMPOS.push(campo)
                    }
                });
            } else {
                this.configuracaoatual.CONFIG_MODELOS.push(dados)
            }

            await axios.put(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`, {
                CAMPOS_MODELOS: JSON.stringify(this.configuracaoatual.CONFIG_MODELOS),
                EDIT_CAMPOS_MODELOS: this.lista.CONFIG_LISTA.EDIT_CAMPOS_MODELOS,
                PRE_LISTA: this.lista.CONFIG_LISTA.PRE_LISTA,
                LISTA_FINAL: this.lista.CONFIG_LISTA.LISTA_FINAL,
            }).then((response) => {
                this.$refs.snackbar.show({
                    message: `${response.data.result}`,
                    status: response.data.status,
                });

                this.$refs.loading.dialog = false;

            }).catch((err) => {
                console.log(err);
            });
        },
        showCamposModelo(item) {
            this.idmodeloSelecionado = item.ID_MODELO;

            if (this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === item.ID_MODELO)) {
                this.camposConfigurados = this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === item.ID_MODELO).CAMPOS
                this.$refs.configmodeloc.camposConfigurados = this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === item.ID_MODELO).CAMPOS;
                this.$refs.configmodeloc.localCamposConfigurados = this.configuracaoatual.CONFIG_MODELOS.find(config => config.ID_MODELO === item.ID_MODELO).CAMPOS;
            }

            this.$refs.configmodeloc.idmodelo = item.ID_MODELO;
            this.$refs.configmodeloc.localIdModelo = item.ID_MODELO;
            this.$refs.configmodeloc.$emit('show-dialog', true);
        },
        async getmodelosutilizados() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}origem/${this.idplurima}/modelos`
            ).then((response) => {
                this.modelosutilizados = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async getConfigsLista() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`
            ).then((response) => {                
                this.lista = response.data.result;                                                
                if(this.lista.CONFIG_LISTA.CAMPOS_MODELOS){                    
                    this.configuracaoatual.CONFIG_MODELOS.push(JSON.parse(this.lista.CONFIG_LISTA.CAMPOS_MODELOS)[0])
                }                
            }).catch((err) => {
                console.log(err.response.data);
            });
        }
    }
}
</script>