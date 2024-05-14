<template>
    <div>
        <v-dialog v-model="showDialog" persistent max-width="450px">
            <v-form @submit.prevent="criarLista">
                <v-card>
                    <v-toolbar color="deep-purple lighten-2" title="CriarStatus" dark>
                        <v-toolbar-title>Criar Lista</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-textarea class="mt-3 mb-0 text-left align-start" label="Lista de Reclamantes"
                            placeholder="Nome da Lista" outlined maxlength="50" v-model="nomelista"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="hideDialog">
                            Fechar
                        </v-btn>
                        <v-btn type="submit" color="deep-purple darken-1" text>
                            Salvar
                        </v-btn>
                    </v-card-actions>
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
import config from "@/config/store.js";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: 'formaprovacao',
    props: {
        show: Boolean,
        idplurima: { type: Number },
    },
    components: {
        loading, snack
    },
    data() {
        return {
            showDialog: false,
            nomelista: '',
            idUsuario: config.user().ID_USUARIO,
            nomeUsuario: config.user().NOME,
            emailUsuario: config.user().EMAIL,
        }
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
            this.nomelista = '';
            this.showDialog = false;
        },
        async salvarLista() {            
            console.log(this.nomelista)
            console.log(this.idUsuario);
            console.log(this.nomeUsuario);
            console.log(this.idplurima);
            console.log(this.emailUsuario);
        },
        async criarLista() {

            if (this.nomelista === "") {
                this.$refs.snackbar.show({
                    message: `O nome da lista não pode ser vazio.`,
                    status: 'alert',
                });
                return;
            }

            this.$refs.loading.dialog = true;
            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}plurimas/listareclamantes`,
                {
                    REF_LISTA: this.nomelista,
                    ID_PLURIMA: this.idplurima,
                    ID_USUARIO: this.idUsuario,
                    NOME_USUARIO: this.nomeUsuario,
                    EMAIL_USUARIO: this.emailUsuario
                })
                .then((response) => {
                    this.$refs.snackbar.show({
                        message: `${response.data.result}`,
                        status: response.data.status,
                    });

                    this.$emit('atualizarlistas');
                    this.hideDialog();
                    this.$refs.loading.dialog = false;
                }).catch((err) => {
                    console.log(err);
                });
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