<template>
    <div v-if="this.lista">
        <v-dialog v-model="showDialog" persistent max-width="1000px">
            <v-card max-width="1000px" style="overflow-x: hidden; border: none;" outlined>
                <v-toolbar color="deep-purple lighten-2" title="listareclamantes" dark>
                    <v-icon dark right>mdi-text-box-edit-outline</v-icon>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-toolbar-title>Editar Lista de Reclamantes: {{ this.lista.REF_LISTA }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <stepperlsita :idplurima="localIdPlurima" :idlista="localLista.ID" ref="stepperlista" />
                <v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="hideDialog">
                            Fechar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <loading ref="loading" />
        <snack ref="snackbar" />
    </div>
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
import stepperlsita from "./stepper.vue";
import loading from "@/components/shared/loading.vue";
import snack from "@/components/shared/snackBar.vue";

export default {
    name: 'dialogstepper',
    props: {
        show: Boolean,
        lista: { type: Object },
        idplurima: { type: Number }
    },
    components: {
        stepperlsita, snack, loading
    },
    data() {
        return {
            showDialog: false,
            localLista: this.lista,
            localIdPlurima: this.idplurima
        }
    },
    watch: {
        lista(newValue) {
            this.localLista = newValue;
        },
        idplurima(newValue) {
            this.localIdPlurima = newValue
        }
    },
    mounted() {
        this.$on('show-dialog', (show) => {
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {
            this.showDialog = false;
        },
    },
}

</script>