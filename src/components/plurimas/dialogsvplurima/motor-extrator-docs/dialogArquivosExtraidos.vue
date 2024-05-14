<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card max-width="900px">
                    <v-toolbar color="deep-purple lighten-2" title="arquivosextraidos" dark>
                        <v-toolbar-title>Arquivos Extraídos - Execução: {{ this.idextracao }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                        <v-toolbar-items class="d-flex align-center my-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="getArquivosExtraidos()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-clipboard-text-search-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Buscar Dados</span>
                            </v-tooltip>
                            <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2" icon dark @click="getArquivosExtraidos()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-update</v-icon>
                                    </v-btn>
                                </template>
                                <span>Atualizar Solicitações</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-data-table :headers="headersArquivos" :items="arquivos" item-key="ID" :search="search"
                        :loading="loadingtable" class="text-no-wrap" fixed-header>
                        <template v-slot:[`item.CREATED_AT`]="{ item }">
                            {{ convertData(item.CREATED_AT) }}
                        </template>
                        <template v-slot:[`item.UPDATED_AT`]="{ item }">
                            {{ convertData(item.UPDATED_AT) }}
                        </template>                                                
                        <template v-slot:[`item.actions`]="{ item }">                            
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="pink darken-1" :size="26"
                                        class="mr-2" @click="showPaginasExtraidas(item)">
                                        mdi-book-open-page-variant-outline
                                    </v-icon>
                                </template>
                                <span>Visualizar Páginas</span>
                            </v-tooltip>
                        </template>
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
        <paginasarquivo ref="paginasextraidas" :zIndex="this.zIndexForOtherDialog"></paginasarquivo>
        <loading ref="loading" />
    </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import paginasarquivo from "@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogPaginas.vue"

export default {
    components: {
        loading, paginasarquivo
    },
    props: {
        zIndex: {
            type: Number,
            default: 1000
        },
        idextracao: {
            type: Number
        }
    },    
    data() {
        return {
            showDialog: false,
            arquivos: [],
            headersArquivos: [
                { text: "ID", value: "ID", align: "center" },
                { text: "ARQUIVO", value: "ARQUIVO"},
                { text: "PAGINAS", value: "NUM_PAGINAS", align: "center" },
                { text: "EDITAVEIS", value: "EDITAVEIS", align: "center" },
                { text: "NÃO EDITAVEIS", value: "N_EDITAVEIS", align: "center" },                
                { text: "Ações", value: "actions", sortable: false, align: "center" },
            ],
            loadingtable: false     ,
            zIndexForOtherDialog: 1000,       
        };
    },    
    mounted() {
        this.$on('show-dialog', async (show) => {     
            this.$refs.loading.dialog = true;       
            await this.getArquivosExtraidos();
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {
            this.arquivos = []
            this.showDialog = false;
        },
        showPaginasExtraidas(item){
            this.$refs.paginasextraidas.idarquivo = item.ID;
            this.$refs.paginasextraidas.arquivo = item;
            this.$refs.paginasextraidas.$emit('show-dialog', true);
        },
        async getArquivosExtraidos() {            
            this.loadingtable = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes/${this.idextracao}/arquivos`
            ).then((response) => {
                this.arquivos = response.data.result;
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
        },
        calcularTempoDecorrido(datainicio, datafim) {
            const dataInicio = new Date(datainicio);
            const dataFim = new Date(datafim);
            let diferenca = Math.abs(dataFim - dataInicio) / 1000; // diferença em segundos
            let tempoDecorrido;

            if (diferenca < 60) {
                tempoDecorrido = `${Math.floor(diferenca)} segundos`;
            } else if (diferenca < 3600) {
                tempoDecorrido = `${Math.floor(diferenca / 60)} minutos`;
            } else {
                tempoDecorrido = `${Math.floor(diferenca / 3600)} horas`;
            }

            return tempoDecorrido;
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