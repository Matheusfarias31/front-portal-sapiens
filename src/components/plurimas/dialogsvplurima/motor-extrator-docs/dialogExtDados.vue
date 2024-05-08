<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card width="700px">
                    <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                        <v-toolbar-title>Executar Motor de Extrair Documentos</v-toolbar-title>
                    </v-toolbar>
                    <v-form @submit.prevent="solicitarExecExtratorDocs">
                        <v-card>
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
                                <v-btn color="red darken-1" text @click="hideDialog">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
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
import config from "@/config/store";
import snack from "@/components/shared/snackBar.vue";


export default {
    components: {
        loading, snack,
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
            extracao: { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } },     
            emailusuario: config.user().EMAIL,    
            nomeusuario: config.user().NOME,   
        };
    },
    mounted() {
        this.$on('show-dialog', (show) => {            
            this.showDialog = show;
        });

    },
    methods: {
        hideDialog() {
            this.extracao = { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } },
            this.caminhoOrgDOcs = '';
            this.showDialog = false;
        },        
        async solicitarExecExtratorDocs() {
            this.$refs.loading.dialog = true;

            if (this.extracao.CAMINHO_DOC == "" || this.extracao.CAMINHO_DOC == null) {
                this.$refs.snackbar.show({
                    message: "Por favor, informe um caminho.",
                    status: 'alert',
                });
                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes`, {
                ORIGEM: "PLURIFY",
                ID_REF_ORIGEM: this.idplurima,
                ID_USUARIO: this.idusuario,
                EMAIL_USUARIO: this.emailusuario,
                NOME_USUARIO: this.nomeusuario,
                CAMINHO_DOC: this.extracao.CAMINHO_DOC,
                CONFIGS: {
                    NOTIFICAR_USUARIO: this.extracao.CONFIGS.NOTIFICAR_USUARIO,
                    NOVOS_ARQUIVOS: this.extracao.CONFIGS.NOVOS_ARQUIVOS,
                    PRIORIDADE: this.extracao.CONFIGS.PRIORIDADE,
                    MULTIPLOS_DOCS: this.extracao.CONFIGS.MULTIPLOS_DOCS
                }
            }).then((response) => {
                this.$refs.snackbar.show({
                    message: `${response.data.result} ID: ${response.data.idextracao}`,
                    status: response.data.status,
                });

                this.$refs.loading.dialog = false;
                this.$emit('atualizarexecextdocs');
                this.hideDialog();
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