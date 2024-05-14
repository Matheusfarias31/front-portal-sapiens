<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card max-width="900px">
                    <v-toolbar color="deep-purple lighten-2" title="atividadesetapa" dark>
                        <v-icon dark right>mdi-run</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-toolbar-title>Iniciar Atividade | Etapa: {{ this.etapa }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-combobox item-text="ATIVIDADE" item-value="ID" v-model="atividadeselecionada"
                                :items="atividades" label="Atividade*" required class="mb-2"></v-combobox>
                        </v-container>
                    </v-card-text>
                    <v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple darken-1" text @click="salvarAtividade">
                                Salvar
                            </v-btn>
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
        idetapa: {
            type: Number
        },
        etapa: {
            type: String
        },
        idusuario: {
            type: Number
        }
    },
    data() {
        return {
            showDialog: false,
            atividades: [],
            atividadeselecionada: null,
            zIndexForOtherDialog: 1000,       
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {
            this.$refs.loading.dialog = true;
            await this.buscarAtividadesEtapa();
            this.$refs.loading.dialog = false;
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {     
            this.atividades = [];     
            this.atividadeselecionada = null;
            this.showDialog = false;
        },
        async buscarAtividadesEtapa() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}atividades/etapas/${this.idetapa}`
            ).then((response) => {
                this.atividades = response.data.result;
                this.loadingtable = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async salvarAtividade() {
            this.$refs.loading.dialog = true;

            if (this.atividadeselecionada == null) {
                this.$refs.snackbar.show({
                    message: 'Selecione uma atividade.',
                    status: 'alert',
                });

                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}atividades/etapas/plurima`, {
                ID_PLURIMA: this.idplurima,
                ID_ATIVIDADE: this.atividadeselecionada.ID,
                ID_USUARIO: this.idusuario,
            }).then((res) => {
                this.atividadeselecionada = null
                this.$refs.snackbar.show({
                    message: res.data.result,
                    status: res.data.status,
                });
                this.$emit('atualizaratividades');                
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