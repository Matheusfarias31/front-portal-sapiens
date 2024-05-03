<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card width="900px">
                    <v-toolbar color="deep-purple lighten-2" title="arquivoslidos" dark>
                        <v-toolbar-title>Arquivos Gerados Não Editáveis | Solicitação ID: {{ this.idsolicitacao }}</v-toolbar-title>
                    </v-toolbar>
                    <v-data-table :loading="loadingtabela" :headers="headersArquivosGeradosNEditaveis" :items="arquivosGeradosNEditaveis"
                        item-key="ID" :search="search" class="mb-0 text-no-wrap" fixed-header
                        :footer-props="{ 'items-per-page-options': [-1] }">
                    </v-data-table>
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
    </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";

export default {
    components: {
        loading
    },
    props: {
        zIndex: {
            type: Number,
            default: 1000
        },
        idsolicitacao: {
            type: Number
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
            arquivosGeradosNEditaveis: [],            
            headersArquivosGeradosNEditaveis: [
                { text: "ID", value: "ID" },
                { text: "ID ARQUIVO LIDO", value: "ID_ARQUIVO_LIDO", align: "center" },
                { text: "ARQUIVO", value: "ARQUIVO", align: "center" },
                { text: "PAGINAS", value: "PAGINAS", align: "center" },
            ],
            loadingtabela: true
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            try {
                await this.getArquivosGeradosNEditaveis(this.idsolicitacao);
                this.showDialog = show;
            } catch (error) {
                console.error("Erro ao obter arquivos editáveis:", error);
            } finally {
                this.$refs.loading.dialog = false;                
            }
        });
    },
    methods: {
        hideDialog() {
            this.arquivoLidos = [];
            this.showDialog = false;
        },
        async getArquivosGeradosNEditaveis(idSolicitacao) {
            this.loadingtabela = true;

            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}arquivos/gerados/neditaveis/${idSolicitacao}`
            ).then((response) => {
                this.arquivosGeradosNEditaveis = response.data.result;
                this.loadingtabela = false;
            }).catch((err) => {
                console.log(err.response.data);
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
    background-color: rgba(234, 0, 255, 0.050);
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