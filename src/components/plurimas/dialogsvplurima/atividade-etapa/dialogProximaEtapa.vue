<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card max-width="900px">
                    <v-toolbar color="deep-purple lighten-2" title="atividadesetapa" dark>
                        <v-icon dark right>mdi-swap-horizontal</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-toolbar-title>Alterar Etapa | Etapa Atual: {{ this.etapaatual }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col>
                                <v-container class="d-flex justify-center align-center">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mr-2 ml-2" v-on="on" size="large" color="lime lighten-1"
                                                dark @click="etapaValidacao()"><v-icon left>mdi-check-decagram</v-icon>VALIDAÇÃO</v-btn>
                                        </template>
                                        <span>Validação da Demanda</span>
                                    </v-tooltip>
                                    <v-icon color="deep-purple lighten-2">mdi-chevron-right</v-icon>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                color="light-green lighten-1" dark @click="primeiraEtapa()"><v-icon
                                                    left>mdi-account-group</v-icon>PRIMEIRA</v-btn>
                                        </template>
                                        <span>Listagem de Envolvidos</span>
                                    </v-tooltip>
                                    <v-icon color="deep-purple lighten-2">mdi-chevron-right</v-icon>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mr-2 ml-2" v-on="on" size="large" color="green lighten-1"
                                                dark @click="segundaEtapa()"><v-icon left>mdi-database-eye</v-icon>SEGUNDA</v-btn>
                                        </template>
                                        <span>Validação de Dados</span>
                                    </v-tooltip>
                                    <v-icon color="deep-purple lighten-2">mdi-chevron-right</v-icon>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mr-2 ml-2" v-on="on" size="large" color="teal lighten-1"
                                                dark @click="terceiraEtapa()"><v-icon left>mdi-file-document-multiple</v-icon>TERCEIRA</v-btn>
                                        </template>
                                        <span>Cálculos Individuais</span>
                                    </v-tooltip>
                                </v-container>
                            </v-col>
                        </v-row>                                                
                    </v-card-text>

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

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
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
        idplurima: {
            type: Number
        },        
        idusuario: {
            type: Number
        },
        etapaatual: {
            type: String
        }
    },
    data() {
        return {
            showDialog: false,            
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;

            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {            
            this.showDialog = false;
        },        
        async etapaValidacao(){
            this.$refs.loading.dialog = true;

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/etapas/plurima`, {
                ID_ETAPA: 4,
                ID_PLURIMA: this.idplurima,
                ID_USUARIO: this.idusuario,
                OBSERVACAO: 'Iniciando etapa de validação.'
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                this.$emit('inicializar');                
                this.hideDialog();
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        async primeiraEtapa(){
            this.$refs.loading.dialog = true;

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/etapas/plurima`, {
                ID_ETAPA: 1,
                ID_PLURIMA: this.idplurima,
                ID_USUARIO: this.idusuario,
                OBSERVACAO: 'Iniciando primeira etapa.'
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                this.$emit('inicializar');                
                this.hideDialog();
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        async segundaEtapa(){
            this.$refs.loading.dialog = true;

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/etapas/plurima`, {
                ID_ETAPA: 2,
                ID_PLURIMA: this.idplurima,
                ID_USUARIO: this.idusuario,
                OBSERVACAO: 'Iniciando segunda etapa.'
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                this.$emit('inicializar');                
                this.hideDialog();
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        async terceiraEtapa(){
            this.$refs.loading.dialog = true;

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/etapas/plurima`, {
                ID_ETAPA: 3,
                ID_PLURIMA: this.idplurima,
                ID_USUARIO: this.idusuario,
                OBSERVACAO: 'Iniciando terceira etapa.'
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                this.$emit('inicializar');                
                this.hideDialog();
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err);
            });
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