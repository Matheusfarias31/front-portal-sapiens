<template>
    <div>
        <v-row justify="center">
            <v-dialog ref="pluriDialog" v-model="dialog" fullscreen transition="dialog-bottom-transition">
                <v-card color="deep-purple lighten-5" light class="mt-0">
                    <v-toolbar color="deep-purple lighten-2" dark><v-icon dark
                            right>mdi-folder-information-outline</v-icon>
                        <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>{{ toolbarTittle
                            }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon dark @click="closeDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card class="mt-2 mr-2 ml-2" color="deep-purple lighten-4" flat height="320">
                        <v-toolbar dense color="deep-purple lighten-3" dark><v-icon dark
                                right>mdi-information-variant-box-outline</v-icon>
                            <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Informações
                                Gerais</v-toolbar-title></v-toolbar>
                        <v-card-text class="mt-0 ml-2">
                            <v-row justify="start">
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-account-circle</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Solicitante: {{
                this.vPlurima.NOME_SOLICITANTE
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-domain</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Cliente: {{
                    this.vPlurima.NOME_CLIENTE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-bell-outline</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Fase: {{
                    this.vPlurima.FASE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-briefcase-outline</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Trabalho: {{
                    this.vPlurima.TRABALHO
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-account-tie</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Responsável: {{
                    this.vPlurima.TIME_PLURIMAS ? 'TIME PLÚRIMAS' :
                        this.vPlurima.NOME_SOLICITANTE
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card color="deep-purple lighten-5" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-calendar-range</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Data de Solicitação: {{
                    convertData(this.vPlurima.DATA_CRIACAO)
                }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="getColorPrazo(this.vPlurima.PRAZO_ENTREGA)" class="mt-0" light
                                        elevation="0" flat height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-clipboard-text-clock</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>PRAZO: {{
                convertData(this.vPlurima.PRAZO_ENTREGA)
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="getColorEtapa(this.vPlurima)" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-step-forward</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Etapa: {{
                this.vPlurima.ETAPA
            }}</v-card-text></v-card>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-card :color="this.vPlurima.COLOR_STATUS" class="mt-0" light elevation="0" flat
                                        height="60"><v-card-text class="mt-1"><v-icon light
                                                right>mdi-list-status</v-icon><v-divider class="mx-2" inset
                                                vertical></v-divider>Status: {{
                this.vPlurima.DESCRICAO
            }}</v-card-text></v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-row justify="center" class="mt-2 mr-0 ml-0">
                        <template>
                            <v-col cols="12" sm="6" md="6" class="mt-0 mr-0 ml-0">
                                <v-card class="mt-0" color="deep-purple lighten-4" flat height="400">
                                    <v-toolbar dense color="deep-purple lighten-3" dark>
                                        <v-icon dark right>mdi-timeline-check-outline</v-icon>
                                        <v-divider class="mx-4" inset vertical></v-divider>
                                        <v-toolbar-title>Status da Atividade</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-toolbar-items>
                                            <v-btn icon dark @click="showDialogAlterarStatus()">
                                                <v-icon>mdi-tag-edit-outline</v-icon>
                                            </v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>
                                    <v-card-text class="mt-3 ml-2">
                                        <v-card class="mt-0" color="deep-purple lighten-4" flat height="300"
                                            style="overflow-x: hidden;">
                                            <v-row justify="center">
                                                <v-col cols="12" sm="11" md="11">
                                                    <v-timeline align-top dense>
                                                        <v-timeline-item v-for="item in this.vLogStatusPlurima"
                                                            :key="item.ID" :color="item.COLOR" small>
                                                            <v-row justify="start">
                                                                <v-col cols="10">
                                                                    <strong>{{ item.STATUS }}</strong>
                                                                    <div class="text-caption mb-0">
                                                                        {{ convertData(item.DATA_CRIACAO) }}
                                                                    </div>
                                                                    <div class="text-caption mb-1">
                                                                        {{ item.OBSERVACAO }}
                                                                    </div>
                                                                </v-col>
                                                            </v-row>
                                                        </v-timeline-item>
                                                    </v-timeline>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </template>

                        <v-col cols="12" sm="6" md="6" class="mt-0 mr-0 ml-0">
                            <v-card class="mt-0" color="deep-purple lighten-4" flat height="400">
                                <v-toolbar dense color="deep-purple lighten-3" dark><v-icon dark right>mdi-run</v-icon>
                                    <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>Andamento da
                                        etapa
                                        atual
                                        ({{ this.vPlurima.ETAPA }})</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                                    <v-toolbar-items>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogStatusMotorOrg()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-tray-full</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Organizar Docs</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogExtratorDocs()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-database-cog</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Extrator de Dados</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark>
                                                    <v-icon v-bind="attrs" v-on="on">mdi-timer-cog</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Motor - Calcular CP</span>
                                        </v-tooltip>
                                        <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark @click="showDialogProximaEtapa()">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-skip-forward</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Avançar Etapa</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon dark>
                                                    <v-icon v-bind="attrs" v-on="on">mdi-note-edit-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Editar Atividades</span>
                                        </v-tooltip>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-card-text class="mt-0 ml-2 mr-2">
                                    <v-row justify="start">
                                        <v-col cols="12" sm="12" md="12">
                                            <v-card color="deep-purple lighten-5" class="mt-0 mr-2" light elevation="0"
                                                flat height="60"><v-card-text class="mt-1"><v-icon light
                                                        right>mdi-timer-play-outline</v-icon><v-divider class="mx-2"
                                                        inset vertical></v-divider>Início da etapa atual: {{
                convertData(
                    this.detalheEtapa.length > 0 ? this.detalheEtapa[0].DATA_CRIACAO :
                        this.vPlurima.DATA_CRIACAO) }}</v-card-text></v-card>
                                        </v-col>
                                    </v-row>

                                    <v-data-table :headers="headersAtividadesEtapas" :items="vDetalheEtapa"
                                        item-key="ID" class="mt-3 mr-2 mb-16 text-no-wrap" height="200" fixed-header
                                        :footer-props="{ 'items-per-page-options': [-1] }">
                                        <template v-slot:[`item.DATA_CRIACAO`]="{ item }">
                                            {{ convertData(item.DATA_CRIACAO) }}
                                        </template>
                                        <template v-slot:[`item.ATIVO`]="{ item }">
                                            <v-icon v-if="item.ATIVO"
                                                color="deep-purple lighten-2">mdi-check-circle</v-icon>
                                            <v-icon v-if="!item.ATIVO" color="red lighten-2">mdi-alert-circle</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>

                <v-dialog v-model="dialogStatusOrgDocs" persistent width="900px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="MotorOrgDocs" dark>
                            <v-toolbar-title>Motor - Organizar Documentos</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-divider class="mr-0 ml-0" inset vertical></v-divider>
                            <v-toolbar-items>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon dark @click="showDialogOrgDocs">
                                            <v-icon v-bind="attrs" v-on="on">mdi-plus-box</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Solicitar Execução</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon dark @click="getExecucoesMotorOrgDocs">
                                            <v-icon v-bind="attrs" v-on="on">mdi-update</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Atualizar Solicitações</span>
                                </v-tooltip>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-data-table :headers="headersExecucoesOrgDocs" :items="execucoesOrgDocs" item-key="ID"
                            :search="search" :loading="loadingExecOrgDocs" class="mb-0 text-no-wrap" fixed-header
                            :footer-props="{ 'items-per-page-options': [-1] }">

                            <template v-slot:[`item.actions`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" color="deep-purple lighten-2" :size="26"
                                            @click="showDialogArquivosLidos(item.ID)" class="mr-2">
                                            mdi-file-eye
                                        </v-icon>
                                    </template>
                                    <span>Arquivos Lidos</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" color="green lighten-1" :size="26"
                                            @click="showDialogArquivosGeradosEditaveis(item.ID)" class="mr-2">
                                            mdi-file-document-check
                                        </v-icon>
                                    </template>
                                    <span>Arquivos Gerados - Editáveis</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" color="red lighten-1" :size="26"
                                            @click="showDialogArquivosGeradosNEditaveis(item.ID)" class="mr-2">
                                            mdi-file-document-alert
                                        </v-icon>
                                    </template>
                                    <span>Arquivos Gerados - Não Editáveis</span>
                                </v-tooltip>
                            </template>
                            <template v-slot:[`item.CREATED_AT`]="{ item }">

                                {{ convertData2(item.CREATED_AT) }}

                            </template>
                        </v-data-table>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialogStatusMotorOrg">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogArquivosLidos" persistent width="900px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="MotorOrgDocs" dark>
                            <v-toolbar-title>Arquivos Lidos</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table :headers="headersArquivosLidos" :items="arquivoLidos" item-key="ID"
                            :search="search" class="mb-0 text-no-wrap" fixed-header
                            :footer-props="{ 'items-per-page-options': [-1] }">
                        </v-data-table>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialogArquivosLidos">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogArquivosGeradosEditaveis" persistent width="900px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="MotorOrgDocs" dark>
                            <v-toolbar-title>Arquivos Gerados - Editáveis</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table :headers="headersArquivosGeradosEditaveis" :items="arquivosGeradosEditaveis"
                            item-key="ID" :search="search" class="mb-0 text-no-wrap" fixed-header
                            :footer-props="{ 'items-per-page-options': [-1] }">
                        </v-data-table>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialogArquivosGeradosEditaveis">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogArquivosGeradosNEditaveis" persistent width="900px">
                    <v-card>
                        <v-toolbar color="deep-purple lighten-2" title="MotorOrgDocs" dark>
                            <v-toolbar-title>Arquivos Gerados - Não Editáveis</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table :headers="headersArquivosGeradosNEditaveis" :items="arquivosGeradosNEditaveis"
                            item-key="ID" :search="search" class="mb-0 text-no-wrap" fixed-header
                            :footer-props="{ 'items-per-page-options': [-1] }">
                        </v-data-table>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialogArquivosGeradosNEditaveis">
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogProximaEtapa" persistent width="800px">
                    <v-form>
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarEtapa" dark>
                                <v-toolbar-title>Próxima Etapa</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-row justify="center">
                                    <v-col>
                                        <v-container class="d-flex justify-center align-center">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="lime lighten-1" dark><v-icon
                                                            left>mdi-check-decagram</v-icon>VALIDAÇÃO</v-btn>
                                                </template>
                                                <span>Validação da Demanda</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="light-green lighten-1" dark><v-icon
                                                            left>mdi-account-group</v-icon>PRIMEIRA</v-btn>
                                                </template>
                                                <span>Listagem de Envolvidos</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="green lighten-1" dark><v-icon
                                                            left>mdi-database-eye</v-icon>SEGUNDA</v-btn>
                                                </template>
                                                <span>Validação de Dados</span>
                                            </v-tooltip>
                                            <v-icon color="deep-purple lighten-2">mdi-skip-forward</v-icon>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="mr-2 ml-2" v-on="on" size="large"
                                                        color="teal lighten-1" dark><v-icon
                                                            left>mdi-file-document-multiple</v-icon>TERCEIRA</v-btn>
                                                </template>
                                                <span>Cálculos Individuais</span>
                                            </v-tooltip>
                                        </v-container>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row justify="center" class="mt-3">
                                    <p>Deseja executar um motor antes? Selecione um motor abaixo:</p>
                                    <v-container class=" mt-0 d-flex justify-center align-center">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="cyan darken-3"
                                                    dark @click="showDialogOrgDocs()">
                                                    <v-icon left>mdi-tray-full</v-icon>Organizar Docs
                                                </v-btn>
                                            </template>
                                            <span>Organizar Documentos da Plúrima</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="teal darken-3"
                                                    dark>
                                                    <v-icon left>mdi-database-cog</v-icon>Extração de Dados
                                                </v-btn>
                                            </template>
                                            <span>Realizar Extração dos Dados</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 ml-2" v-on="on" size="small" color="brown darken-3"
                                                    dark>
                                                    <v-icon left>mdi-timer-cog</v-icon>Calcular Pontos
                                                </v-btn>
                                            </template>
                                            <span>Calcular Cartôes de Ponto</span>
                                        </v-tooltip>
                                    </v-container>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="closeDialogProximaEtapa">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

                <v-dialog v-model="dialogOrgDocs" persistent width="700px">
                    <v-form @submit.prevent="solicitarExecOrgDocs">
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                                <v-toolbar-title>Executar Motor de Organizar Documentos</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-combobox item-text="FILIAL" item-value="ID" v-model="selectedFilialOrgDocs"
                                        :items="filiaisOrgDocs" label="Filial*" required class="mb-2"></v-combobox>
                                    <v-textarea required class="mt-2 mb-0 text-left align-start" label="Caminho"
                                        placeholder="Caminho dos arquivos (Máx. 300 caracteres)" outlined
                                        maxlength="300" v-model="caminhoOrgDOcs"></v-textarea>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn type="submit" color="deep-purple darken-1" text>
                                    Salvar
                                </v-btn>
                                <v-btn color="red darken-1" text @click="closeDialogOrgDocs">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

                <v-dialog v-model="dialogAlterarStatus" persistent width="500px">
                    <v-form @submit.prevent="saveStatus">
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                                <v-toolbar-title>Alterar Status</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-combobox item-text="DESCRICAO" item-value="ID" v-model="selectedStatus"
                                        :items="statusAtivos" label="Status*" required class="mb-2"></v-combobox>
                                    <v-textarea class="mt-2 mb-0 text-left align-start" label="Observação"
                                        placeholder="Observação (Máx. 300 caracteres)" outlined maxlength="300"
                                        v-model="observacaoStatus"></v-textarea>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="closeDialogAlterarStatus">
                                    Cancelar
                                </v-btn>
                                <v-btn type="submit" color="deep-purple darken-1" text>
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

                <v-dialog v-model="dialogExtratorDocs" persistent width="600px">
                    <v-form @submit.prevent="solicitarExecExtratorDocs">
                        <v-card>
                            <v-toolbar color="deep-purple lighten-2" title="EditarStatus" dark>
                                <v-toolbar-title>Executar Extrator de Documentos</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-container>
                                    <v-row justify="center">
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.NOTIFICAR_USUARIO"
                                                label="Notificar Usuário"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.NOVOS_ARQUIVOS"
                                                label="Novos Arquivos"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.PRIORIDADE" label="Prioridade"></v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-switch color="deep-purple lighten-2"
                                                v-model="extracao.CONFIGS.MULTIPLOS_DOCS"
                                                label="Múltiplos Documentos"></v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-textarea required class="mt-2 mb-0 text-left align-start"
                                        label="Caminho dos Documentos"
                                        placeholder="Caminho dos arquivos (Máx. 300 caracteres)" outlined
                                        maxlength="300" v-model="extracao.CAMINHO_DOC"></v-textarea>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn type="submit" color="deep-purple darken-1" text>
                                    Salvar
                                </v-btn>
                                <v-btn color="red darken-1" text @click="closeDialogExtratorDocs">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>

            </v-dialog>
        </v-row>
        <loading ref="loading" />
        <snack ref="snackbar" />
        <loadingextrator ref="loadingextrator" />
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
import loading from "@/components/shared/loading.vue";
import loadingextrator from "@/components/shared/loadingextrator.vue"
import snack from "@/components/shared/snackBar.vue";
import axios from "axios";
import dayjs from "dayjs";
import config from "@/config/store";

export default {
    name: 'plurimaview',
    components: {
        snack, loading, loadingextrator
    },
    data() {
        return {
            dialogAlterarStatus: false,
            dialogProximaEtapa: false,
            dialogOrgDocs: false,
            selectedStatus: { ID: null, DESCRICAO: null },
            observacaoStatus: '',
            filiaisOrgDocs: [],
            selectedFilialOrgDocs: { ID: null, FILIAL: null },
            caminhoOrgDOcs: '',
            statusAtivos: [],
            vPlurima: this.plurimaProp,
            vDetalheEtapa: this.detalheEtapa,
            vLogStatusPlurima: this.logStatus,
            dialogStatusOrgDocs: false,
            loadingExecOrgDocs: false,
            execucoesOrgDocs: [],
            headersExecucoesOrgDocs: [
                { text: "ID", value: "ID" },
                { text: "SOLICITANTE", value: "NOME", align: "center" },
                { text: "STATUS", value: "STATUS_MOTOR", align: "center" },
                { text: "DATA", value: "CREATED_AT", align: "center" },
                { text: "AÇÕES", value: "actions", sortable: false, align: "center" },

            ],
            arquivoLidos: [],
            dialogArquivosLidos: false,
            headersArquivosLidos: [
                { text: "ID", value: "ID" },
                { text: "ARQUIVO", value: "ARQUIVO", align: "center" },
                { text: "ERRO", value: "ERRO", align: "center" },
                { text: "PAGINAS EDITÁVEIS", value: "PAG_EDITAVEIS", align: "center" },
                { text: "PAGINAS NÃO EDITÁVEIS", value: "PAG_NEDITAVEIS", align: "center" }
            ],
            arquivosGeradosEditaveis: [],
            dialogArquivosGeradosEditaveis: false,
            headersArquivosGeradosEditaveis: [
                { text: "ID", value: "ID" },
                { text: "ID ARQUIVO LIDO", value: "ID_ARQUIVO_LIDO", align: "center" },
                { text: "ARQUIVO", value: "ARQUIVO", align: "center" },
                { text: "TIPO", value: "TIPO", align: "center" },
                { text: "MODELO", value: "REF_MODELO", align: "center" },
                { text: "PAGINAS", value: "PAGINAS", align: "center" }
            ],
            extracao: { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } },
            arquivosGeradosNEditaveis: [],
            dialogArquivosGeradosNEditaveis: false,
            headersArquivosGeradosNEditaveis: [
                { text: "ID", value: "ID" },
                { text: "ID ARQUIVO LIDO", value: "ID_ARQUIVO_LIDO", align: "center" },
                { text: "ARQUIVO", value: "ARQUIVO", align: "center" },
                { text: "PAGINAS", value: "PAGINAS", align: "center" },
            ],
            headersAtividadesEtapas: [
                { text: "Atividade", value: "ATIVIDADE" },
                { text: "Responsável", value: "NOME", align: "center" },
                { text: "Início", value: "DATA_CRIACAO", align: "center" },
                { text: "Ativo", value: "ATIVO", align: "center" },
            ],
            dialogExtratorDocs: false,
            idUsuario: config.user().ID_USUARIO,
            nomeUsuario: config.user().NOME,
            emailUsuario: config.user().EMAIL,
            Authorization: "Bearer " + localStorage.getItem("tokenSistema_1017"),
        }
    },
    props: {
        show: Boolean,
        plurimaProp: Array,
        detalheEtapa: Array,
        logStatus: Array
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
    watch: {
        show(newValue) {
            this.dialog = newValue;
        },
        plurimaProp(newValue) {
            if (newValue) {
                this.vPlurima = newValue;
            }
        },
        detalheEtapa(newValue) {
            if (newValue) {
                this.vDetalheEtapa = newValue;
            }
        },
        logStatus(newValue) {
            if (newValue) {
                this.vLogStatusPlurima = newValue;
            }
        }
    },
    async mounted() {
        await this.getStatusAtivos();
    },
    methods: {
        async saveStatus() {
            this.$refs.loading.dialog = true;
            await axios.post(`${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima`, {
                ID_STATUS: this.selectedStatus.ID,
                OBSERVACAO: this.observacaoStatus,
                ID_PLURIMA: this.vPlurima.ID,
                ID_USUARIO: this.idUsuario
            }).then((response) => {
                this.dialogAlterarStatus = false;
                this.$refs.loading.dialog = false;
                this.vPlurima.ID_STATUS = this.selectedStatus.ID;
                this.vPlurima.DESCRICAO = this.selectedStatus.DESCRICAO;
                this.vPlurima.COLOR_STATUS = this.selectedStatus.COLOR;
                this.observacaoStatus = '';
                this.getLogStatusPlurima();
                this.$refs.snackbar.show({
                    message: response.data.result,
                    status: response.data.status,
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        async getLogStatusPlurima() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_BASE_URL}log/status/plurima/${this.vPlurima.ID}`
            ).then((response) => {
                this.vLogStatusPlurima = response.data.log;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        showDialogStatusMotorOrg() {
            this.getExecucoesMotorOrgDocs();
            this.dialogStatusOrgDocs = true;
        },
        closeDialogStatusMotorOrg() {
            this.dialogStatusOrgDocs = false;
        },
        showDialogAlterarStatus() {
            this.dialogAlterarStatus = true;
        },
        closeDialogAlterarStatus() {
            this.dialogAlterarStatus = false;
        },
        showDialogProximaEtapa() {
            this.dialogProximaEtapa = true;
        },
        closeDialogProximaEtapa() {
            this.dialogProximaEtapa = false;
        },
        showDialogOrgDocs() {
            this.getFiliaisOrgDocs();
            this.dialogOrgDocs = true;
        },
        closeDialogOrgDocs() {
            this.dialogOrgDocs = false;
            this.selectedFilialOrgDocs = { ID: null, FILIAL: null };
            this.caminhoOrgDOcs = '';
        },
        async getExecucoesMotorOrgDocs() {
            this.$refs.loading.dialog = true;
            this.loadingExecOrgDocs = true;
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}solicitacoes/plurimas/${this.vPlurima.ID}`
            ).then((response) => {
                this.execucoesOrgDocs = response.data.result;
                this.$refs.loading.dialog = false;
                this.loadingExecOrgDocs = false;
            }).catch((err) => {
                console.log(err.response.data);
            });

        },
        showDialogArquivosLidos(idSolicitacao) {
            this.getArquivosLidosMotorOrg(idSolicitacao);
            this.dialogArquivosLidos = true;
        },
        closeDialogArquivosLidos() {
            this.dialogArquivosLidos = false;
        },
        async getArquivosLidosMotorOrg(idSolicitacao) {
            this.$refs.loading.dialog = true;

            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}arquivos/lidos/${idSolicitacao}`
            ).then((response) => {
                this.arquivoLidos = response.data.result;
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        showDialogArquivosGeradosEditaveis(idSolicitacao) {
            this.getArquivosGeradosEditaveis(idSolicitacao);
            this.dialogArquivosGeradosEditaveis = true;
        },
        closeDialogArquivosGeradosEditaveis() {
            this.dialogArquivosGeradosEditaveis = false;
        },
        async getArquivosGeradosEditaveis(idSolicitacao) {
            this.$refs.loading.dialog = true;

            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}arquivos/gerados/editaveis/${idSolicitacao}`
            ).then((response) => {
                this.arquivosGeradosEditaveis = response.data.result;
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        showDialogArquivosGeradosNEditaveis(idSolicitacao) {
            this.getArquivosGeradosNEditaveis(idSolicitacao);
            this.dialogArquivosGeradosNEditaveis = true;
        },
        closeDialogArquivosGeradosNEditaveis() {
            this.dialogArquivosGeradosNEditaveis = false;
        },
        async getArquivosGeradosNEditaveis(idSolicitacao) {
            this.$refs.loading.dialog = true;

            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}arquivos/gerados/neditaveis/${idSolicitacao}`
            ).then((response) => {
                this.arquivosGeradosNEditaveis = response.data.result;
                this.$refs.loading.dialog = false;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async solicitarExecOrgDocs() {
            this.$refs.loading.dialog = true;

            if (this.caminhoOrgDOcs == "") {
                this.$refs.snackbar.show({
                    message: "Por favor, informe um caminho.",
                    status: false,
                });
                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}solicitacoes`, {
                ID_PLURIMA: this.vPlurima.ID,
                ID_USUARIO: this.idUsuario,
                ID_FILIAL: this.selectedFilialOrgDocs.ID,
                PRIORIDADE: false,
                CAMINHO: this.caminhoOrgDOcs,
                ORIGEM: 'PLURIFY'
            }).then((response) => {
                this.selectedStatus.ID = '1017';
                this.observacaoStatus = 'Motor de Organizar Documentos solicitado.'
                this.selectedStatus.DESCRICAO = 'AGUARD. MOTOR'
                this.selectedStatus.COLOR = 'blue lighten-1';
                this.saveStatus();
                this.closeDialogOrgDocs();
                this.closeDialogProximaEtapa();
                this.getExecucoesMotorOrgDocs();
                this.$refs.loading.dialog = false;
                this.$refs.snackbar.show({
                    message: response.data.result,
                    status: response.data.status,
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        async getFiliaisOrgDocs() {
            await axios.get(
                `${process.env.VUE_APP_ROOT_API_MOTOR_ORG_DOCS_URL}filiais`
            ).then((response) => {
                this.filiaisOrgDocs = response.data.result;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        async getStatusAtivos() {
            this.statusAtivos = [];

            await axios({
                method: "get",
                url: `${process.env.VUE_APP_ROOT_API_BASE_URL}status/ativos`,
            })
                .then((response) => {
                    this.statusAtivos = response.data.result;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        convertData(item) {
            if (item && typeof item === 'string') {
                if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
                    return dayjs(item.replace("T", " ").replace("Z", "")).format(
                        "DD/MM/YYYY"
                    );
                }
            }
        },
        getColorPrazo(item) {
            const currentDate = dayjs().startOf('day');
            const givenDate = dayjs(item).startOf('day');
            const marginDate = currentDate.add(5, 'day');

            if (givenDate.isBefore(currentDate)) {
                return "red lighten-2";
            } else if (givenDate.isBefore(marginDate)) {
                return "amber lighten-2"
            } else {
                return "green lighten-2";
            }
        },
        getColorEtapa(item) {
            if (item.ETAPA == "VALIDAÇÃO") return "lime lighten-1";
            if (item.ETAPA == "PRIMEIRA") return "light-green lighten-1";
            if (item.ETAPA == "SEGUNDA") return "green lighten-1";
            if (item.ETAPA == "TERCEIRA") return "teal lighten-1";
        },
        closeDialog() {
            this.docFisico = false;
            this.prazoEntrega = '';
            this.link = '';
            this.selectedCliente = { NomeCliente: null, idCliente: null };
            this.selecectFase = { FASE: null, ID: null };
            this.selectedTrabalho = { TRABALHO: null, ID: null };
            this.timePlurimas = false;
            this.numeroProcesso = '';
            this.observacaoStatus = '';
            this.selectedStatus = { ID: null, DESCRICAO: null }
            this.$emit("closePlurimaView");
        },
        convertData2(item) {
            if (dayjs(item).format("DD/MM/YYYY") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        },
        reset() {
            this.$refs.pluriDialog.reset();
        },
        showDialogExtratorDocs() {
            this.dialogExtratorDocs = true;
        },
        closeDialogExtratorDocs() {
            this.dialogExtratorDocs = false;
            this.extracao = { CAMINHO: null, CONFIGS: { NOTIFICAR_USUARIO: true, NOVOS_ARQUIVOS: false, PRIORIDADE: false, MULTIPLOS_DOCS: true } };
            this.caminhoOrgDOcs = '';
        },
        async solicitarExecExtratorDocs() {
            this.$refs.loading.dialog = true;

            if (this.extracao.CAMINHO_DOC == "") {
                this.$refs.snackbar.show({
                    message: "Por favor, informe um caminho.",
                    status: false,
                });
                this.$refs.loading.dialog = false;
                return;
            }

            await axios.post(`${process.env.VUE_APP_ROOT_API_EXTRATOR_DOCS_URL}extracoes`, {
                ORIGEM: "PLURIFY",
                ID_REF_ORIGEM: this.vPlurima.ID,
                ID_USUARIO: this.idUsuario,
                EMAIL_USUARIO: this.emailUsuario,
                NOME_USUARIO: this.nomeUsuario,
                CAMINHO_DOC: this.extracao.CAMINHO_DOC,
                CONFIGS: {
                    NOTIFICAR_USUARIO: this.extracao.CONFIGS.NOTIFICAR_USUARIO,
                    NOVOS_ARQUIVOS: this.extracao.CONFIGS.NOVOS_ARQUIVOS,
                    PRIORIDADE: this.extracao.CONFIGS.PRIORIDADE,
                    MULTIPLOS_DOCS: this.extracao.CONFIGS.MULTIPLOS_DOCS
                }
            }).then((response) => {
                this.selectedStatus.ID = '1017';
                this.observacaoStatus = `Motor de Extrair Dados Solicitado. ID da Extração: ${response.data.idextracao}`;
                this.selectedStatus.DESCRICAO = 'AGUARD. MOTOR'
                this.selectedStatus.COLOR = 'blue lighten-1';
                this.$refs.loading.dialog = false;
                
                this.$refs.snackbar.show({
                    message: `${response.data.result} ID: ${response.data.idextracao}`,
                    status: response.data.status,
                });

                this.saveStatus();
                this.closeDialogExtratorDocs();
                this.closeDialogProximaEtapa();                
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

</script>