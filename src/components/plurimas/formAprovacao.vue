<template>
    <div>
        <v-form ref="form" v-if="formularioAprovacao" lazy-validation>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="Application" dark>
                            <v-toolbar-title v-mask="'#######-##.####.#.##.####'">Aprovar Plúrima: {{ this.vPlurima.NUMERO_PROCESSO }}</v-toolbar-title>
                            
                        </v-toolbar>
                        <v-card-text class="mt-8">
                            <h3>Formulário de Aprovação</h3>
                            <v-container>
                                <v-row class="mb-0 mt-0">
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Solicitante:</p>
                                        <p><strong>{{ this.vPlurima.NOME_SOLICITANTE }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Cliente:</p>
                                        <p><strong>{{ this.vPlurima.NOME_CLIENTE }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Fase:</p>
                                        <p><strong>{{ this.vPlurima.FASE }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Trabalho:</p>
                                        <p><strong>{{ this.vPlurima.TRABALHO }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Doc Físico:</p>
                                        <p><strong>{{ this.vPlurima.DOC_FISICO ? "Sim" : "Não"}}</strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Link:</p>
                                        <p><strong> <a :href="this.vPlurima.LINK">Clique aqui</a></strong></p>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <p class="mb-0">Prazo:</p>
                                        <p><strong>{{ formatarData(this.vPlurima.PRAZO_ENTREGA) }}</strong></p>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" @click="fecharForm()" text>
                                Cancelar
                            </v-btn>
                            <v-btn color="deep-purple darken-1" text >
                                Recusar
                            </v-btn>
                            <v-btn color="deep-purple darken-1" text >
                                Aprovar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-form>
    </div>
</template>


<script>

export default {
    name: 'formaprovacao',
    props: {
        show: Boolean,
        plurimaProp: Array
    },
    data(){
        return{
            vPlurima: this.plurimaProp,
            formularioAprovacao: true
        }        
    },
    watch: {
        plurimaProp(newValue) {
            if (newValue) {
                this.vPlurima = newValue;
            }
        }
    },
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
    methods: {
        fecharForm() {            
            this.formularioAprovacao = false;
        },
        formatarData(data) {
            
            const dataObj = new Date(data);

            // Obtém o dia, mês e ano
            const dia = dataObj.getDate();
            const mes = dataObj.getMonth() + 1;
            const ano = dataObj.getFullYear();

            
            const dataFormatada = `${dia}/${mes}/${ano}`;

            return dataFormatada;
            },
    },
}

</script>