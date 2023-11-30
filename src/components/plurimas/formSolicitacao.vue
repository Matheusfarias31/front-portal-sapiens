<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="Application" dark>
                            <v-toolbar-title>Solicitar Plúrima</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="mt-8">                            
                            <small>Formulário de solicitação</small>
                            <v-container>
                                <v-row class="mb-0 mt-0">
                                    <v-col cols="12" sm="6">
                                        <v-text-field :rules="rule" return-masked-value v-mask="'#######-##.####.#.##.####'"
                                            label="Processo*" type="text" numeric v-model="numeroProcesso"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <dataInput :dateEdit="prazoEntrega" :rules="rule1" label="Prazo de Entrega**"
                                            @date="prazoEntrega = $event" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <!-- Primeiro combobox -->
                                        <v-combobox item-text="FASE" item-value="ID" v-model="selecectFase" :items="fases"
                                            :rules="rule1" label="Fase*" required></v-combobox>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <!-- Segundo combobox -->
                                        <v-combobox item-text="TRABALHO" item-value="ID" v-model="selectedTrabalho"
                                            :items="trabalhos" :rules="rule1" label="Trabalho*" required></v-combobox>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-combobox item-text="NomeCliente" item-value="Id" v-model="selectedCliente"
                                            :items="clientes" :rules="rule1" label="Cliente*" required></v-combobox>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field label="Link*" type="text" numeric v-model="link"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-switch v-model="docFisico" color="deep-purple lighten-2" label="Doc. Físico"
                                            value="true" hide-details label-placement="left" inset></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-switch v-model="timePlurimas" color="deep-purple lighten-2" label="Time Plúrimas"
                                            value="true" hide-details label-placement="left" inset></v-switch>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <p></p>
                            <small>* Campos obrigatórios</small><br>
                            <small>** A sugestão é de 30 dias no prazo de entrega</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" @click="reset(), closeForm()" text>
                                Fechar
                            </v-btn>
                            <v-btn :disabled="!valid" type="submit" color="deep-purple darken-1" text @click="solicitarPlurima()">
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-form>
        <loading ref="loading" />
        <snack ref="snackbar" />
    </div>
</template>

<script>
import axios from "axios";
import config from "@/config/store";
import urls from "@/config/urls";
import snack from "@/components/shared/snackBar.vue";
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import dataInput from "../shared/inputDate.vue";

export default {
    name: 'formSolicitacao',
    components: {
        snack,
        loading,
        dataInput
    },
    props: {
        show: Boolean
    },
    data: () => ({
        idUsuario: config.user().ID_USUARIO,
        Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
        numeroProcesso: '',
        valid: false,
        selectedCliente: { NomeCliente: null, idCliente: null },
        selecectFase: { FASE: null, ID: null },
        selectedTrabalho: { TRABALHO: null, ID: null },
        link: '',
        timePlurimas: false,
        prazoEntrega: '', //30 dias corridos
        docFisico: false,
        rule1: [(v) => v != null || "É necessário"],
        rule: [(v) => !!v || "É necessário"],
        clientes: [],
        fases: [],
        trabalhos: []
    }),
    computed: {
        dialog: {
            get() {
                return this.$props["show"];
            },
            set(value) {
                this.$emit("update:show", value);
            },
        }
    },
    async mounted() {
        this.estimativaPrazoEntrega();
        await this.getClientes();
        await this.getFases();
        await this.getTrabalhos();
    },
    minData() {
        return dayjs(new Date()).format("HH:mm") >= "16:00"
            ? dayjs(new Date().setDate(new Date().getDate() + 30)).format(
                "YYYY-MM-DD"
            )
            : dayjs(new Date().setDate(new Date().getDate())).format("YYYY-MM-DD");
    },
    methods: {
        async solicitarPlurima() {
            await axios.post(`${urls.urlLocal}plurimas`, {
                NUMERO_PROCESSO: this.numeroProcesso,
                ID_SOLICITANTE: this.idUsuario,
                ID_CLIENTE: this.selectedCliente.Id,
                DOC_FISICO: this.docFisico,
                PRAZO_ENTREGA: this.prazoEntrega,
                ID_FASE: this.selecectFase.ID,
                ID_TRABALHO: this.selectedTrabalho.ID,
                LINK: this.link,
                TIME_PLURIMAS: this.timePlurimas
            }).then((response) => {
                this.reset();                
                this.closeForm();
                this.$refs.snackbar.show({
                    message: response.data.result,
                    status: response.data.status,
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        estimativaPrazoEntrega() {
            this.prazoEntrega = dayjs(new Date().setDate(new Date().getDate() + 30)).format("YYYY-MM-DD");
        },
        async getClientes() {
            await axios.get(`${urls.urlLocal}clientes`, {
                headers: {
                    Authorization: this.Authorization,
                },
            }).then((response) => {
                this.clientes = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async getFases() {
            await axios.get(`${urls.urlLocal}fases`, {
                headers: {
                    Authorization: this.Authorization,
                },
            }).then((response) => {
                this.fases = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async getTrabalhos() {
            await axios.get(`${urls.urlLocal}trabalhos`, {
                headers: {
                    Authorization: this.Authorization,
                },
            }).then((response) => {
                this.trabalhos = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        closeForm() {            
            this.docFisico = false;
            this.prazoEntrega = '';
            this.link = '';
            this.selectedCliente = { NomeCliente: null, idCliente: null };
            this.selecectFase = { FASE: null, ID: null };
            this.selectedTrabalho = { TRABALHO: null, ID: null };
            this.timePlurimas = false;
            this.numeroProcesso = '';
            this.$emit("closeFormSolicitacao");
        },
        reset() {
            this.$refs.form.reset();
        }
    }
}

</script>
