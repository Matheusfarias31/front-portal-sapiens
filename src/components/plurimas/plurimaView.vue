<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
                <v-card color="deep-purple lighten-5" light class="mt-0">
                    <v-toolbar color="deep-purple lighten-2" dark><v-icon dark right>mdi-folder-information-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>{{ toolbarTittle
                        }}</v-toolbar-title></v-toolbar>
                    <v-card class="mt-2 mr-2 ml-2" color="deep-purple lighten-4" flat height="200px">
                        <v-toolbar dense color="deep-purple lighten-3" dark><v-icon dark
                                right>mdi-information-variant-box-outline</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Informações
                                Gerais</v-toolbar-title></v-toolbar>
                        <v-card-text class="mt-0 ml-2">
                            <v-row justify="start">
                                <v-col cols="12" sm="6" md="5">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0"><v-card-text
                                            class="mt-2"><v-icon light
                                                right>mdi-information-variant-box-outline</v-icon><v-divider class="mx-2"
                                                inset vertical></v-divider>Número do Processo: {{
                                                    this.vPlurima.NUMERO_PROCESSO
                                                }}</v-card-text></v-card>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>

                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'plurimaview',
    data: () => ({
        vPlurima: this.plurimaProp,
        teste: this.show
    }),
    props: {
        show: Boolean,
        plurimaProp: Array
    },
    computed: {
        dialog: {
            get() {
                return this.$props["show"];
            },
            set(value) {
                this.$emit("update:show", value);
            },
        },
        toolbarTittle() {
            return `Plúrima: ${this.vPlurima.NUMERO_PROCESSO} | ID: ${this.vPlurima.ID}`;
        }
    },
    mounted: {
        executeConsole() {
            console.log(this.vPlurima.ID);
        }
    },
    watch: {
        show(newValue) {
            this.dialog = newValue;
        },
        plurimaProp(newValue) {
            this.vPlurima = newValue;
        }
    },
}

</script>