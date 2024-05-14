<template>
    <v-stepper-content step="1">

        <v-form>
            <v-card class="mb-12" height="450px" style="overflow-x: hidden;">

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
                                    <v-card color="teal lighten-5" class="mt-0 mb-a" light elevation="0" height="60">
                                        <v-card-text class="d-flex justify-space-between align-center mt-0 mb-0">
                                            <div>
                                                <v-icon light right>mdi-regex</v-icon>
                                                <v-divider class="mx-2" inset vertical></v-divider>
                                                ID Modelo: {{ items.ID_MODELO }} <v-divider class="mx-2" inset
                                                    vertical></v-divider>
                                                Tipo de
                                                Modelo: {{ items.TIPO_MODELO }}
                                                <v-divider class="mx-2" inset vertical></v-divider> Referência do
                                                Modelo: {{
                            items.REF_MODELO }}
                                            </div>
                                            <v-icon dark color="teal lighten-3">mdi-cog-outline</v-icon>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-row>


                <v-row justify="center">
                    <v-card class="mt-2 mr-2 ml-2 center" color="purple lighten-4" flat min-width="950px">
                        <v-toolbar dense color="purple lighten-2" dark><v-icon dark
                                right>mdi-content-save-cog-outline</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Configuração
                                Atual</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-col v-for="(items, indexitems) in modelosutilizados" :key="indexitems">
                            <v-row justify="start">
                                <v-col cols="12" sm="12" md="12">
                                    <v-card color="purple lighten-5" class="mt-0 mb-a" light elevation="0" height="60">
                                        <v-card-subtitle v-if="configuracaoatual.CONFIG_MODELOS.length == 0" class="mt-0 mb-0">
                                            Nenhuma configuração realizada.
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-row>


            </v-card>



        </v-form>


        <loading ref="loading" />
    </v-stepper-content>
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

export default {
    name: 'stepconfigmodelos',
    components: loading,
    props: {
        idplurima: { type: Number },
        idlista: { type: Number }
    },
    data() {
        return {
            modelosutilizados: [],
            configuracaoatual: { ID_LISTA: this.idlista, CONFIG_MODELOS: [] },
        };
    },
    mounted() {
        this.$refs.loading.dialog = true;
        this.getmodelosutilizados();
        this.$refs.loading.dialog = false;
    },
    methods: {
        async getmodelosutilizados() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}origem/${this.idplurima}/modelos`
            ).then((response) => {
                this.modelosutilizados = response.data.result;
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        }
    }
}
</script>