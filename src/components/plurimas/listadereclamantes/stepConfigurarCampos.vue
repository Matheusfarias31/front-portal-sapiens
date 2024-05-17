<template>
    <v-div>
        <v-stepper-content step="2">
            <v-form class="mb-0">
                <v-card class="mb-12 mt-0" min-height="700px" style="border: none;" outlined>
                    <v-row class="justify-end mr-0 mt-3">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="mr-3" height="40" width="300" dark color="deep-purple lighten-2"
                                    v-bind="attrs" v-on="on" @click="backstep"><v-icon class="mr-3" :size="25" right
                                        dark>mdi-page-previous-outline</v-icon>
                                    Etapa Anterior
                                </v-btn>
                            </template>
                            <span>Voltar para etapa anterior.</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn height="40" width="300" dark color="pink lighten-2" v-bind="attrs" v-on="on"
                                    @click="nextStep">
                                    Próxima Etapa<v-icon class="ml-3" :size="25" right
                                        dark>mdi-page-next-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Continuar para a próxima etapa.</span>
                        </v-tooltip>
                    </v-row>
                    <v-card-subtitle class="mt-0 mb-0">
                        LEGENDAS <br>
                        Em caso de nomes iguais, o Plurify irá considerar como o mesmo campo.<br>
                        Só será possível gerar a Pré-lista quando todos os campos forem nomeados. <br>
                    </v-card-subtitle>
                    <v-toolbar dense color="deep-orange lighten-3" dark><v-icon dark
                            right>mdi-rename-box-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Campos da
                            Lista</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-data-table :headers="headersCampos" :items="camposConfig" item-key="ID" :loading="loadingTable"
                        class="mb-0 mt-0 text-no-wrap" max-height="550px" fixed-header>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="deep-orange lighten-2" :size="26"
                                        class="mr-2" @click="showEditarNomeLista(item)">
                                        mdi-form-textbox
                                    </v-icon>
                                </template>
                                <span>Editar Nome na Lista</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="deep-orange lighten-2" :size="26"
                                        class="mr-2" >
                                        mdi-filter-plus-outline
                                    </v-icon>
                                </template>
                                <span>Atribuir Filtro</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-form>

            <v-dialog v-model="editarNomeLista" persistent max-width="400px">
                <v-card color="deep-orange lighten-4">
                    <v-toolbar color="deep-orange lighten-2" title="CriarStatus" dark>
                        <v-toolbar-title>Adicionar Filtro Textual</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-textarea class="mt-3 mb-0 text-left align-start" label="Filtro..." placeholder="Filtro..."
                            outlined maxlength="100" v-model="campoEditado.NOME_LISTA"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-orange darken-1" text @click="salvarNomeLista">
                            Salvar Nome
                        </v-btn>
                        <v-btn color="red darken-1" text @click="editarNomeLista = false">
                            Fechar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
import snack from "@/components/shared/snackBar.vue";

export default {
    name: "configurarcampos",
    components: {
        loading, snack
    },
    props: {
        idplurima: { type: Number },
        idlista: { type: Number }
    },
    data() {
        return {
            localIdLista: this.idlista,
            camposConfig: [],
            headersCampos: [
                { text: "ID MODELO", value: "ID_MODELO", align: "center" },
                { text: "ID_CAMPO", value: "ID_CAMPO", align: "center" },
                { text: "CAMPO", value: "CAMPO", align: "center" },
                { text: "NOME NA LISTA", value: "NOME_LISTA", align: "center" },
                { text: "Ações", value: "actions", sortable: false, align: "center" },
            ],
            camposSelecionados: [],
            loadingTable: true,
            editarNomeLista: false,
            camposBd: [],
            campoEditado: { ID_MODELO: 0, ID_CAMPO: 0, CAMPO: "", NOME_LISTA: "" }
        };
    },
    watch: {
        idlista(newValue) {
            this.localIdLista = newValue;
            this.getConfigsLista();
        }
    },
    mounted() {
        this.$on('reset-component', () => {
            this.camposConfig = [];
            this.camposSelecionados = [];
            this.campoEditado = { ID_MODELO: 0, ID_CAMPO: 0, CAMPO: "", NOME_LISTA: "" };
            this.camposBd = [];
            this.campoEditado = { ID_MODELO: 0, ID_CAMPO: 0, CAMPO: "", NOME_LISTA: "" };
        });

        this.$on('start-component', async () => {
            this.camposConfig = [];
            this.camposSelecionados = [];
            this.$refs.loading.dialog = true;
            await this.getConfigsLista();
            this.loadingTable = false;
            this.$refs.loading.dialog = false;
        });
    },
    methods: {
        fecharEditarNomeLista() {
            this.campoEditado = { ID_MODELO: 0, ID_CAMPO: 0, CAMPO: "", NOME_LISTA: "" };
            this.editarNomeLista = false;
        },
        showEditarNomeLista(item) {
            this.campoEditado = { ID_MODELO: item.ID_MODELO, ID_CAMPO: item.ID_CAMPO, CAMPO: item.CAMPO, NOME_LISTA: item.NOME_LISTA };
            this.editarNomeLista = true;
        },
        salvarNomeLista() {
            if (this.campoEditado.NOME_LISTA === "") {
                this.$refs.snackbar.show({
                    message: `Informe um nome para o campo na lista.`,
                    status: 'alert',
                });
            } else {
                const index = this.camposConfig.findIndex(c => c.ID_CAMPO === this.campoEditado.ID_CAMPO && c.ID_MODELO === this.campoEditado.ID_MODELO);
                if (index !== -1) {
                    this.camposConfig[index].NOME_LISTA = this.campoEditado.NOME_LISTA;
                    this.camposConfig = [...this.camposConfig];
                } else {
                    console.error('Item não encontrado na matriz camposConfig');
                }

                this.fecharEditarNomeLista();
            }
        },
        async getConfigsLista() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`
            ).then((response) => {
                this.lista = response.data.result;

                try {
                    this.camposSelecionados.push(JSON.parse(this.lista.CONFIG_LISTA.CAMPOS_MODELOS)[0]);
                } catch (error) {
                    this.camposSelecionados = [];
                }

                try {
                    if (this.lista.CONFIG_LISTA.EDIT_CAMPOS_MODELOS != null) {
                        this.camposBd.push(JSON.parse(this.lista.CONFIG_LISTA.EDIT_CAMPOS_MODELOS));
                    } else {
                        this.camposBd = [];
                    }
                } catch (error) {
                    this.camposBd = [];
                }

                this.completarConfigs();

            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        backstep() {
            this.$emit('back-step');
        },
        completarConfigs() {
            if (this.camposSelecionados.length > 0) {
                this.camposSelecionados.forEach(cs => {
                    cs.CAMPOS.forEach(campo => {
                        console.log(campo);
                        if (this.camposBd[0] != undefined) {
                            if (this.camposBd[0].filter(cbd => cbd.ID_CAMPO === campo.ID_CAMPO && cs.ID_MODELO === cbd.ID_MODELO).length > 0 && campo.ATIVO) {
                                this.camposConfig.push({
                                    ID_MODELO: cs.ID_MODELO,
                                    ID_CAMPO: campo.ID_CAMPO,
                                    CAMPO: campo.CAMPO,
                                    NOME_LISTA: this.camposBd[0].filter(cbd => cbd.ID_CAMPO === campo.ID_CAMPO && cs.ID_MODELO === cbd.ID_MODELO)[0].NOME_LISTA
                                })
                            } else if (campo.ATIVO) {
                                this.camposConfig.push({
                                    ID_MODELO: cs.ID_MODELO,
                                    ID_CAMPO: campo.ID_CAMPO,
                                    CAMPO: campo.CAMPO,
                                    NOME_LISTA: ""
                                })
                            }
                        }
                        else if (campo.ATIVO) {
                            this.camposConfig.push({
                                ID_MODELO: cs.ID_MODELO,
                                ID_CAMPO: campo.ID_CAMPO,
                                CAMPO: campo.CAMPO,
                                NOME_LISTA: ""
                            })
                        }
                    })
                })
            }
        },
        async nextStep() {
            this.$refs.loading.dialog = true;
            if (this.camposConfig.find(c => c.NOME_LISTA === "")) {
                this.$refs.snackbar.show({
                    message: `Há campos sem nomes atribuídos.`,
                    status: 'alert',
                });
                this.$refs.loading.dialog = false;

            } else {
                await axios.put(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`, {
                    CAMPOS_MODELOS: this.lista.CONFIG_LISTA.CONFIG_MODELOS,
                    EDIT_CAMPOS_MODELOS: JSON.stringify(this.camposConfig),
                    PRE_LISTA: this.lista.CONFIG_LISTA.PRE_LISTA,
                    LISTA_FINAL: this.lista.CONFIG_LISTA.LISTA_FINAL,
                }).then((response) => {
                    this.$refs.snackbar.show({
                        message: `${response.data.result}`,
                        status: response.data.status,
                    });

                }).catch((err) => {
                    console.log(err);
                });


                await axios.get(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}/prelista`)
                    .then(() => {
                    }).catch((err) => {
                        console.log(err);
                    });


                this.$refs.loading.dialog = false;
                this.$emit('next-step');
            }
        }
    }
}

</script>