<template>
    <div>
        <div v-if="showDialog" class="dialog-overlay" :style="{ zIndex: zIndex }">
            <div class="dialog-content">
                <v-card max-width="900px">
                    <v-toolbar color="deep-purple lighten-2" title="paginasextraidas" dark>
                        <v-toolbar-title>Páginas Encontradas</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                        <v-toolbar-items class="d-flex align-center my-2">                            
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-4" icon dark>
                                        <v-icon v-bind="attrs" v-on="on"
                                            @click="baixarTextoOriginal()">mdi-script-text-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Baixar Texto Original</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mb-4" icon dark>
                                        <v-icon v-bind="attrs" v-on="on"
                                            @click="downloadExcel()">mdi-microsoft-excel</v-icon>
                                    </v-btn>
                                </template>
                                <span>Baixar Excel</span>
                            </v-tooltip>
                        </v-toolbar-items>                                                
                    </v-toolbar>
                    <v-data-table :headers="headersPaginas" :items="paginas" item-key="ID" :search="search"
                        :loading="loadingtable" class="text-no-wrap" fixed-header>
                        <template v-slot:[`item.EDITAVEL`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-if="!item.EDITAVEL" v-bind="attrs" v-on="on" color="red darken-3"
                                        :size="26" class="mr-2">
                                        mdi-file-document-remove-outline
                                    </v-icon>
                                    <v-icon v-if="item.EDITAVEL" v-bind="attrs" v-on="on" color="green darken-2"
                                        :size="26" class="mr-2">
                                        mdi-file-document-check-outline
                                    </v-icon>
                                </template>
                                <span v-if="!item.EDITAVEL">Não editável</span>
                                <span v-if="item.EDITAVEL">Editável</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="teal darken-1" :size="26"
                                        @click="showDadosPagina(item)" class="mr-2">
                                        mdi-table-eye
                                    </v-icon>
                                </template>
                                <span>Visualizar Dados</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                    <v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="hideDialog">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </div>
        </div>
        <dadospagina ref="dadospagina" :zIndex="this.zIndexForOtherDialog"></dadospagina>
        <loading ref="loading" />
    </div>
</template>

<script>
import loading from "@/components/shared/loading.vue";
import dayjs from "dayjs";
import dadospagina from "@/components/plurimas/dialogsvplurima/motor-extrator-docs/dialogDadosPagina.vue"
import * as XLSX from 'xlsx';

export default {
    components: {
        loading, dadospagina
    },
    props: {
        zIndex: {
            type: Number,
            default: 1000
        },
        idarquivo: {
            type: Number
        },
        arquivo: {
            type: Array
        },
        paginas: {
            type: Array
        }
    },
    data() {
        return {
            showDialog: false,            
            search: '',
            headersPaginas: [
                { text: "ID", value: "ID", align: "center" },
                { text: "NÚMERO", value: "NUM_PAGINA", align: "center" },
                { text: "EDITÁVEL", value: "EDITAVEL", align: "center" },
                { text: "TIPO", value: "TIPO_MODELO", align: "center" },
                { text: "MODELO", value: "REF_MODELO", align: "center" },
                { text: "COMPATIBILIDADE(%)", value: "COMPATIBILIDADE", align: "center" },
                { text: "Ações", value: "actions", sortable: false, align: "center" },
            ],
            loadingtable: false,
            zIndexForOtherDialog: 1000,       
        };
    },
    mounted() {
        this.$on('show-dialog', async (show) => {            
            this.showDialog = show;
        });
    },
    methods: {
        hideDialog() {            
            this.showDialog = false;
        },
        baixarTextoOriginal() {
            this.$refs.loading.dialog = true;
            let txt = "";
            this.paginas.forEach(pag => {
                txt += `=============================================\n`;
                txt += `ARQUIVO: ${pag.ID_ARQUIVO} | PÁGINA: ${pag.NUM_PAGINA} | MODELO: ${pag.REF_MODELO}\n\n`;
                txt += `${pag.TEXTO_PAGINA}\n\n`
            });

            const blob = new Blob([txt], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `arquivo_${this.idarquivo}.txt`;
            link.click();
            this.$refs.loading.dialog = false;
        },
        downloadExcel() {
            this.$refs.loading.dialog = true;
            const rows = [];

            this.paginas.forEach(item => {
                const resultModeloJson = JSON.parse(item.RESULTADO_MODELO);
                const resultadoModelo = resultModeloJson?.Results || [];
                const verbaResults = resultadoModelo.filter(r => r.VERBA);
                const registroCP = resultadoModelo.filter(r => r.REGISTRO_CP);
                const outrasInfos = resultadoModelo.filter(r => !r.REGISTRO_CP && !r.VERBA);


                if (verbaResults.length > 0) {
                    verbaResults.forEach(verba => {
                        let row = {};
                        row["PAGINA"] = item.NUM_PAGINA
                        const itensV = verba.VERBA;

                        outrasInfos.forEach(info => {
                            Object.keys(info).forEach(key => {
                                row[key] = info[key];
                            });
                        })

                        Object.keys(itensV).forEach(verbaKey => {
                            row[`VERBA.${verbaKey}`] = itensV[verbaKey];
                        });

                        rows.push(row);
                    });
                }

                if (registroCP.length > 0) {                    
                    registroCP.forEach(registro => {
                        let row = {};
                        row["PAGINA"] = item.NUM_PAGINA
                        const itensCP = registro.REGISTRO_CP;

                        outrasInfos.forEach(info => {
                            Object.keys(info).forEach(key => {
                                row[key] = info[key];
                            });
                        })

                        Object.keys(itensCP).forEach(verbaKey => {
                            row[`VERBA.${verbaKey}`] = itensCP[verbaKey];
                        });

                        rows.push(row);
                    });
                }

                if (registroCP.length == 0 && verbaResults.length == 0) {
                    let row = {};
                    row["PAGINA"] = item.NUM_PAGINA
                    outrasInfos.forEach(info => {
                        Object.keys(info).forEach(key => {
                            row[key] = info[key];
                        });
                    })

                    rows.push(row);
                }
            });


            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha1');

            // Salvar o arquivo
            XLSX.writeFile(workbook, `arquivo${this.idarquivo}.xlsx`);
            this.$refs.loading.dialog = false;
        },
        async showDadosPagina(item) {
            this.$refs.dadospagina.pagina = item;
            this.$refs.dadospagina.numpaginas = this.paginas.length;
            this.$refs.dadospagina.$emit('show-dialog', true);
        },        
        convertData(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
        calcularTempoDecorrido(datainicio, datafim) {
            const dataInicio = new Date(datainicio);
            const dataFim = new Date(datafim);
            let diferenca = Math.abs(dataFim - dataInicio) / 1000; // diferença em segundos
            let tempoDecorrido;

            if (diferenca < 60) {
                tempoDecorrido = `${Math.floor(diferenca)} segundos`;
            } else if (diferenca < 3600) {
                tempoDecorrido = `${Math.floor(diferenca / 60)} minutos`;
            } else {
                tempoDecorrido = `${Math.floor(diferenca / 3600)} horas`;
            }

            return tempoDecorrido;
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