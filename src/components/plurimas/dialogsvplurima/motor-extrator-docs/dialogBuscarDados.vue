<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card min-width="1200px" color="deep-purple lighten-5">
                    <v-toolbar color="deep-purple lighten-2" title="buscaavancada" dark>
                        <v-icon dark right>mdi-clipboard-text-search-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-toolbar-title>Módulo Avançado de Busca | Plúrima: {{ this.idplurima }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="d-flex align-center my-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-2 mr-0" icon dark @click="hideDialog()">
                                        <v-icon v-bind="attrs" v-on="on">mdi-close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Fechar</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-subtitle class="mt-0 mb-0">
                        Importante: Caracteres em caixa alta e em caixa baixa são tratados de modo diferente.
                    </v-card-subtitle>
                    <v-row justify="center">
                        <v-card class="mt-2 mr-2 ml-2 center" color="teal lighten-4" flat width="1150px">
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
                                                    ID Modelo: {{ items.ID_MODELO }} <v-divider class="mx-2" inset
                                                        vertical></v-divider>
                                                    Tipo de
                                                    Modelo: {{ items.TIPO_MODELO }}
                                                    <v-divider class="mx-2" inset vertical></v-divider> Referência do
                                                    Modelo: {{
            items.REF_MODELO }}
                                                </div>
                                                <v-icon
                                                    v-if="filtrosmodelo.filter(f => f.ID_MODELO == items.ID_MODELO).length > 0"
                                                    dark color="teal lighten-3"
                                                    @click="configModelo(items.ID_MODELO)">mdi-cog-outline</v-icon>
                                                <v-icon
                                                    v-if="filtrosmodelo.filter(f => f.ID_MODELO == items.ID_MODELO).length == 0"
                                                    dark color="red lighten-3"
                                                    @click="configModelo(items.ID_MODELO)">mdi-cog-off-outline</v-icon>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-card>
                    </v-row>

                    <v-row justify="center">
                        <v-card class="mt-5 mr-2 ml-2 center" color="red lighten-4" flat width="1150px">
                            <v-toolbar dense color="red lighten-3" dark><v-icon dark right>mdi-text-recognition</v-icon>
                                <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Filtros
                                    Textuais</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-subtitle v-if="filtro.FILTRO_GERAL.length == 0" class="mt-0 mb-0">
                                Nenhum filtro cadastrado.
                            </v-card-subtitle>

                            <v-col v-for="(items, indexitems) in filtro.FILTRO_GERAL" :key="indexitems">
                                <v-card color="red lighten-5" class="mt-0 mb-0" light elevation="0" height="60">
                                    <v-card-text class="d-flex justify-space-between align-center mt-0 mb-0">
                                        <div>
                                            <v-icon light right>mdi-text-recognition</v-icon>
                                            <v-divider class="mx-2" inset vertical></v-divider>
                                            {{ items.FILTRO }}
                                        </div>
                                        <v-icon dark color="red lighten-3"
                                            @click="removeFilterItem(indexitems)">mdi-trash-can-outline</v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-card>
                    </v-row>
                    <v-sheet class="py-5 px-3" color="deep-purple lighten-5">
                        <v-row class="justify-end mr-3">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn height="40" width="200" dark color="red lighten-3" v-bind="attrs" v-on="on"
                                        @click="addfiltrotextual = true">
                                        Filtro - Texto<v-icon :size="25" right dark>mdi-text-recognition</v-icon>
                                    </v-btn>
                                </template>
                                <span>Configurar filtros por texto</span>
                            </v-tooltip>
                        </v-row>
                    </v-sheet>
                    <v-sheet class="py-5 px-3" color="deep-purple lighten-5">
                        <v-row class="justify-end mr-3">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn height="40" width="300" dark color="deep-purple lighten-3" v-bind="attrs"
                                        v-on="on" @click="realizarBusca">
                                        REALIZAR BUSCA<v-icon :size="25" right dark>mdi-card-search-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Buscar Páginas</span>
                            </v-tooltip>
                        </v-row>
                    </v-sheet>
                    <v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="hideDialog">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>

                <v-dialog v-model="addfiltrotextual" persistent max-width="400px">
                    <v-card color="red lighten-4">
                        <v-toolbar color="red lighten-2" title="CriarStatus" dark>
                            <v-toolbar-title>Adicionar Filtro Textual</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-textarea class="mt-3 mb-0 text-left align-start" label="Filtro..."
                                placeholder="Filtro..." outlined maxlength="100" v-model="novofiltro"></v-textarea>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple darken-1" text @click="adicionarFiltro()">
                                Adicionar Filtro
                            </v-btn>
                            <v-btn color="red darken-1" text @click="addfiltrotextual = false">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="configmodelo" persistent max-width="800px">
                    <v-card class="mt-0 mr-0 ml-0 center" color="teal lighten-5" flat width="800px">
                        <v-toolbar flat color="teal lighten-3" dark><v-icon dark right>mdi-regex</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Configurar
                                Campos</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-subtitle class="mt-2 mb-0">
                            Importante: Caracteres em caixa alta e em caixa baixa são tratados de modo diferente.
                        </v-card-subtitle>
                        <v-sheet class="py-5 px-3 mr-2 mb-1" color="teal lighten-5">
                            <v-row class="justify-end">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn height="40" width="200" dark color="teal lighten-3" v-bind="attrs"
                                            v-on="on" @click="adicionarCampo = true">
                                            Adicionar Campo<v-icon :size="25" right dark>mdi-regex</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Adicionar Campo</span>
                                </v-tooltip>
                            </v-row>
                        </v-sheet>
                        <v-data-table :headers="headersFiltrosModelo" :items="camposModeloSelecionado"
                            class="text-no-wrap mr-2 ml-2" :items-per-page="10">
                            <template v-slot:top>
                                <v-toolbar flat dense class="mb-8 rounded" dark color="teal lighten-3">
                                    <v-toolbar-title>Campos Configurados</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                        <v-form>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="hideConfigModelo">
                                    Fechar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="adicionarCampo" persistent max-width="400px">
                    <v-card class="mt-0 mr-0 ml-0 center" color="teal lighten-5" flat width="800px">
                        <v-toolbar color="teal lighten-3" title="detalhemodelo" dark>
                            <v-icon dark right>mdi-regex</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-toolbar-title>Adicionar Filtro</v-toolbar-title>
                        </v-toolbar>
                        <v-container>
                            <v-combobox item-text="CAMPO" item-value="ID" v-model="campoadicionar" :items="camposmodelo"
                                label="Selecione um Campo*" required class="mb-2"></v-combobox>
                            <v-textarea class="mt-2 mb-0 text-left align-start" label="Filtro"
                                placeholder="Filtro (Máx. 50 caracteres)" outlined maxlength="100"
                                v-model="filtroadicionar"></v-textarea>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple darken-1" text @click="adicionarFiltroCampo">
                                Salvar
                            </v-btn>
                            <v-btn color="red darken-1" text @click="hideAdicionarCampoModelo">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>
        </div>
        <dialogpaginaspequisa ref="paginasencontradas" :zIndex="this.zIndexForOtherDialog"></dialogpaginaspequisa> -->
        <loading ref="loading" />
        <snack ref="snackbar" />
    </div>
</template>

<script>
import axios from "axios";
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import snack from "@/components/shared/snackBar.vue";
import dialogpaginaspequisa from "@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogPaginasPesquisa.vue"

export default {
    components: {
        loading, snack, dialogpaginaspequisa
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
        }
    },
    data() {
        return {
            showDialog: false,
            loadingtable: false,
            modelosutilizados: [],
            filtro: { ID_ORIGEM: this.idplurima, FILTRO_MODELOS: [], FILTRO_GERAL: [] },
            zIndexForOtherDialog: 1000,
            addfiltrotextual: false,
            novofiltro: '',
            filtrosmodelo: [],
            camposmodelo: [],
            camposModeloSelecionado: [],
            configmodelo: false,
            campoadicionar: [],
            idModeloSelecionado: 0,
            filtroadicionar: '',
            headersFiltrosModelo: [
                { text: "CAMPO", value: "CAMPO", align: "center" },
                { text: "FILTRO", value: "FILTRO", align: "center" },
            ],
            adicionarCampo: false
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            this.camposModeloSelecionado = [];
            this.camposmodelo= [];
            this.filtrosmodelo = [];
            await this.getmodelosutilizados();
            this.showDialog = show;
            this.$refs.loading.dialog = false;
        });
    },
    methods: {
        hideDialog() {
            this.extracoes = [];
            this.showDialog = false;
            this.filtro = { ID_ORIGEM: this.idplurima, FILTRO_MODELOS: [], FILTRO_GERAL: [] };
        },
        hideConfigModelo() {
            this.idModeloSelecionado = 0;
            this.configmodelo = false;
        },
        hideAdicionarCampoModelo() {
            this.campoadicionar = [];
            this.filtroadicionar = '';
            this.adicionarCampo = false;
        },
        removeFilterItem(index) {
            this.filtro.FILTRO_GERAL.splice(index, 1);
        },
        async realizarBusca() {
            this.$refs.loading.dialog = true;

            await axios.post(`${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}dados/pesquisa`, {
                ID_ORIGEM: this.idplurima,
                FILTRO_MODELOS: this.filtrosmodelo,
                FILTRO_GERAL: this.filtro.FILTRO_GERAL,
            }).then((response) => {                
                this.$refs.paginasencontradas.paginas = response.data.result;      
                console.log(this.$refs.paginasencontradas.paginas);
                this.$refs.loading.dialog = false;
                this.$refs.paginasencontradas.$emit('show-dialog', true);
            }).catch((err) => {
                console.log(err);
            });
        },
        async configModelo(idModelo) {

            this.$refs.loading.dialog = true;
            this.camposModeloSelecionado = [];

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${idModelo}/detalhes`,
            }).then((res) => {
                this.camposmodelo = res.data.result[0].REGEXES;
            }).catch((err) => {
                console.log(err);
            });

            console.log(this.filtrosmodelo);

            this.filtrosmodelo.forEach(f => {
                if (f.ID_MODELO == idModelo) {
                    console.log('Aqui')
                    f.CAMPOS.forEach(c => {
                        this.camposModeloSelecionado.push({ ID_MODELO: c.ID_MODELO, CAMPO: c.CAMPO, FILTRO: c.FILTRO })
                    })
                }
            })

            this.idModeloSelecionado = idModelo;
            this.configmodelo = true;
            this.$refs.loading.dialog = false;
        },
        adicionarFiltroCampo() {
            this.$refs.loading.dialog = true;

            if (this.campoadicionar.length == 0) {
                this.$refs.snackbar.show({
                    message: 'Selecione um campo',
                    status: 'alert',
                });
                return;
            }

            if (this.filtroadicionar == '') {
                this.$refs.snackbar.show({
                    message: 'Digite um filtro.',
                    status: 'alert',
                });
                return;
            }

            this.camposModeloSelecionado.push({
                ID_CAMPO: this.campoadicionar.ID,
                CAMPO: this.campoadicionar.CAMPO,
                FILTRO: this.filtroadicionar
            });

            const modeloExiste = this.filtrosmodelo.filter(f => f.ID_MODELO == this.idModeloSelecionado).length > 0;

            if (modeloExiste) {
                this.filtrosmodelo.forEach(f => {
                    if (f.ID_MODELO == this.idModeloSelecionado) {
                        f.CAMPOS.push({
                            ID_CAMPO: this.campoadicionar.ID,
                            CAMPO: this.campoadicionar.CAMPO,
                            FILTRO: this.filtroadicionar
                        })
                    }
                })
            } else {
                this.filtrosmodelo.push({
                    ID_MODELO: this.idModeloSelecionado, CAMPOS: [{
                        ID_CAMPO: this.campoadicionar.ID,
                        CAMPO: this.campoadicionar.CAMPO,
                        FILTRO: this.filtroadicionar
                    }]
                })
            }

            this.hideAdicionarCampoModelo();
            this.$refs.loading.dialog = false;
        },
        adicionarFiltro() {
            if (this.novofiltro == '') {
                this.$refs.snackbar.show({
                    message: 'Digite um filtro.',
                    status: 'alert',
                });
                return;
            }

            this.filtro.FILTRO_GERAL.push({ FILTRO: this.novofiltro });
            this.novofiltro = '';
            this.addfiltrotextual = false;
        },
        async getmodelosutilizados() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes/${this.idplurima}/modelos`
            ).then((response) => {
                this.modelosutilizados = response.data.result;
                this.$refs.loading.dialog = false;
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