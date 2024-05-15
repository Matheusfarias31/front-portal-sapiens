<template>
    <div>
        <v-dialog v-model="showDialog" persistent max-width="450px">
            <v-form>
                <v-card class="no-scroll-card" flat style="overflow-x: hidden; border: none;" outlined>
                    <v-toolbar color="deep-purple lighten-2" title="detalhemodelo" dark>
                        <v-toolbar-title>Campos Disponíveis</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ attrs }">
                                    <v-btn v-bind="attrs" icon dark @click="salvarLista">
                                        <v-icon>mdi-content-save-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Salvar Configuração</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ attrs }">
                                    <v-btn v-bind="attrs" icon dark @click="hideDialog">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Fechar Sem Salvar</span>
                            </v-tooltip>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text class="mt-0 ml-0">
                        <v-data-table :headers="headerscampos" :items="camposModelo" class="text-no-wrap"
                            :items-per-page="30" :loading="loadingTable">
                            <template v-slot:[`item.ATIVO`]="{ item }">
                                <v-row justify="center">
                                    <v-switch color="deep-purple lighten-2" v-model="item.ATIVO"
                                        v-if="item.ATIVO !== undefined" @change="onSwitchChange(item)"></v-switch>
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
        <loading ref="loading" />
        <snack ref="snackbar" />
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: 'configmodelo',
    props: {
        show: Boolean,
        idmodelo: { type: Number },
        camposconfigurados: { type: Array }
    },
    components: {
        loading, snack
    },
    data() {
        return {
            showDialog: false,
            loadingTable: true,
            localIdModelo: this.idmodelo,
            localCamposConfigurados: this.camposConfigurados,
            camposModelo: [],
            headerscampos: [
                { text: "CAMPO", value: "CAMPO" },
                { text: "ATIVO", value: "ATIVO", align: "center" },
            ],
            configModelo: { ID_MODELO: this.idmodelo, CAMPOS: [] }
        }
    },
    watch: {
        idmodelo(newValue) {
            this.localIdModelo = newValue;
            this.configModelo.ID_MODELO = newValue;
        },
        camposConfigurados(newValue) {
            this.localCamposConfigurados = newValue;
        }
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            await this.inicializar();
            this.completarConfig();
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        onSwitchChange(item) {
            return item;
        },
        hideDialog() {
            this.showDialog = false;
        },
        async salvarLista() {
            this.camposModelo.forEach(campo => {
                if (this.configModelo.CAMPOS.find(config => config.ID_CAMPO === campo.ID_CAMPO)) {
                    this.configModelo.CAMPOS.filter(config => config.ID_CAMPO === campo.ID_CAMPO).ATiVO = campo.ATIVO
                } else {
                    this.configModelo.CAMPOS.push({ ID_CAMPO: campo.ID, CAMPO: campo.CAMPO, ATIVO: campo.ATIVO })
                }
            })

            this.$emit('update-config', this.configModelo);
            this.hideDialog();
        },
        async inicializar() {
            this.loadingTable = true;
            this.camposModelo = [];
            this.configModelo = { ID_MODELO: this.idmodelo, CAMPOS: [] };
            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}regex/modelos/${this.localIdModelo}/detalhes`,
            }).then((res) => {
                this.modelodetalhado = res.data.result[0];
                this.camposModelo = this.modelodetalhado.REGEXES;
            }).catch((err) => {
                console.log(err);
            });
        },
        completarConfig() {
            if (this.camposModelo.length > 0) {
                this.camposModelo.forEach(c => {
                    if (this.camposConfigurados.length > 0) {                                                
                        if (this.camposConfigurados.find(cc => cc.ID_CAMPO == c.ID)) {                            
                            c.ATIVO = this.camposConfigurados.find(cc => cc.ID_CAMPO == c.ID).ATIVO
                        } else {
                            c.ATIVO = false
                        }
                    } else {
                        c.ATIVO = false
                    }
                })
            }

            this.loadingTable = false;
        },
        convertData(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
    },
}
</script>