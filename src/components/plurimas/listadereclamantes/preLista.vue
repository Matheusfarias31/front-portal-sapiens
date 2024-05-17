<template>
    <v-div>
        <v-stepper-content step="3">
            <v-form class="mb-0">
                <v-card class="mb-12 mt-0" min-height="700px" style="border: none;" outlined>
                    <v-row class="justify-end mr-0 mt-3 mb-5">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="mr-3" height="40" width="300" dark color="deep-orange lighten-2"
                                    v-bind="attrs" v-on="on" @click="backstep"><v-icon class="mr-3" :size="25" right
                                        dark>mdi-page-previous-outline</v-icon>
                                    Etapa Anterior
                                </v-btn>
                            </template>
                            <span>Voltar para etapa anterior.</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn height="40" width="300" dark color="deep-purple lighten-2" v-bind="attrs"
                                    v-on="on">
                                    Finalizar Lista<v-icon class="ml-3" :size="25" right dark>mdi-account-group</v-icon>
                                </v-btn>
                            </template>
                            <span>Continuar para a próxima etapa.</span>
                        </v-tooltip>
                    </v-row>
                    
                    <v-toolbar dense color="pink lighten-3" dark><v-icon dark right>mdi-human-queue</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Pré-Lista de
                            Reclamantes</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-data-table max-height="550px" :headers="headers" :items="prelista" class="elevation-1">
                        <template v-slot:[`item.MANTER_NA_LISTA`]="{ item }">
                            <v-row justify="center">
                                <v-switch color="deep-purple lighten-2" v-model="item.MANTER_NA_LISTA"
                                    v-if="item.MANTER_NA_LISTA !== undefined" @change="onSwitchChange(item)"></v-switch>
                            </v-row>
                        </template>
                    </v-data-table>
                </v-card>
            </v-form>
        </v-stepper-content>

        <loading ref="loading" />
        <snack ref="snackbar" />
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
    name: "prelista",
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
            prelista: [],
            lista: [],
            loadingTable: true,
            fixedFields: ['MANTER_NA_LISTA'],
            dynamicFields: [],
        };
    },
    watch: {
        idlista(newValue) {
            this.localIdLista = newValue;
            this.getConfigsLista();
        }
    },
    computed: {
        headers() {
            const dynamicHeaders = this.dynamicFields.map(field => ({
                text: field.replace(/_/g, ' '),
                value: field,
                align: 'center'
            }));

            const fixedHeaders = this.fixedFields.map(field => ({
                text: field.replace(/_/g, ' '),
                value: field,
                align: 'center'
            }));

            return [...fixedHeaders, ...dynamicHeaders];
        }
    },
    mounted() {
        this.$on('reset-component', () => {
            this.prelista = []
        });

        this.$on('start-component', async () => {
            this.prelista = []
            await this.getConfigsLista();
            this.dynamicFields = this.extractDynamicFields(this.prelista);
            this.loadingTable = false;
        });
    },
    methods: {
        onSwitchChange(item) {
            return item;
        },
        async getConfigsLista() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/${this.idplurima}/listareclamantes/${this.localIdLista}`
            ).then((response) => {
                this.lista = response.data.result;
                this.prelista = JSON.parse(this.lista.CONFIG_LISTA.PRE_LISTA);
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        extractDynamicFields(data) {
            const allFields = new Set();

            data.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (!this.fixedFields.includes(key)) {
                        allFields.add(key);
                    }
                });
            });

            return Array.from(allFields);
        },
        backstep() {
            this.$emit('back-step');
        },
    }
}

</script>