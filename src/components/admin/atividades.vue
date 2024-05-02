<template>
    <v-sheet class="py-5 px-10">
        <v-data-table :headers="headersatividades" :items="atividades" :search="search" :loading="loadingTable"
            loading-text="Carregando... Aguarde por  favor!" class="text-no-wrap">
            <template v-slot:top>
                <v-toolbar flat class="mb-8 rounded" dark color="deep-purple lighten-2">
                    <v-toolbar-title>Atividades das Etapas</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa" single-line hide-details
                        class="mr-6" tile></v-text-field>
                    <template>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" large v-bind="attrs" v-on="on" @click="initialize()">mdi-update</v-icon>
                            </template>
                            <span>Atualizar</span>
                        </v-tooltip>
                    </template>
                    <template>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon large v-bind="attrs" v-on="on"
                                    @click="dialogatividade = true">mdi-notebook-plus-outline</v-icon>
                            </template>
                            <span>Criar Atividade</span>
                        </v-tooltip>
                    </template>
                </v-toolbar>
            </template>
        </v-data-table>

        <v-dialog v-model="dialogatividade" persistent max-width="400px">
            <v-form>
                <v-card class="no-scroll-card" flat style="overflow-x: hidden;">
                    <v-toolbar color="deep-purple lighten-2" title="detalhemodelo" dark>
                        <v-icon dark right>mdi-notebook-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-toolbar-title>Criar Atividade</v-toolbar-title>
                    </v-toolbar>
                    <v-container>
                        <v-combobox item-text="ETAPA" item-value="ID" v-model="etapaselecionada" :items="etapas"
                            label="Selecione uma Etapa*" required class="mb-2"></v-combobox>
                        <v-textarea class="mt-2 mb-0 text-left align-start" label="Atividade"
                            placeholder="Observação (Máx. 50 caracteres)" outlined maxlength="50"
                            v-model="atividade"></v-textarea>
                    </v-container>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-purple darken-1" text @click="criarAtividade">
                            Salvar
                        </v-btn>
                        <v-btn color="red darken-1" text @click="hideDialog">
                            Fechar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <loading ref="loading" />
        <snack ref="snackbar" />

    </v-sheet>
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

.no-scroll-card {
    overflow: hidden;
}
</style>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: "atividade",
    components: {
        loading, snack
    },
    data: () => ({
        etapas: [],
        dialogatividade: false,
        atividades: [],
        atividade: '',
        etapaselecionada: null,
        headersatividades: [
            { text: "ATIVIDADE", value: "ATIVIDADE" },
            { text: "ETAPA", value: "ETAPA", align: "center" },
        ],
        search: ''
    }),
    created() {

        this.initialize();

    },

    watch: {
        dialogForm(val) {
            val || this.close();
        },
    },
    methods: {
        async initialize() {
            this.loadingTable = true;
            await this.listarEtapas();
            await this.listarAtividades();
            this.loadingTable = false;

        },
        async listarEtapas() {
            axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}etapas`,
            }).then((result) => {
                this.etapas = result.data.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        async listarAtividades() {
            this.atividades = [];
            axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}atividades`,
            }).then((result) => {
                this.atividades = result.data.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        hideDialog() {
            this.atividade = '';
            this.etapaselecionada = null;
            this.dialogatividade = false;
        },
        async criarAtividade() {
            this.$refs.loading.dialog = true;

            if (this.etapaselecionada == null) {
                this.$refs.snackbar.show({
                    message: 'Selecione uma etapa.',
                    status: 'alert',
                });

                this.$refs.loading.dialog = false;
                return;
            }

            if (this.atividade == '') {
                this.$refs.snackbar.show({
                    message: 'Descreva uma atividade.',
                    status: 'alert',
                });

                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}atividades`, {
                ID_ETAPA: this.etapaselecionada.ID,
                ATIVIDADE: this.atividade                
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                
                this.hideDialog();
                this.initialize();
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err);
            });

        },        
    },
};
</script>