<template>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="purple lighten-2">
          <!-- Nome do passo 1 -->
          Configurar Campos dos Documentos
        </v-stepper-step>
  
        <v-divider></v-divider>
        
        <v-stepper-step :complete="e1 > 2" step="2">
          <!-- Nome do passo 2 -->
          Configurar Campos da Lista
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e2 > 2" step="3">
          <!-- Nome do passo 2 -->
          Pré-Lista
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step step="4">
          <!-- Nome do passo 3 -->
          Lista Final
        </v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <!-- Usando o componente stepconfigmodelos como conteúdo do passo 1 -->
        <stepconfigmodelos :idplurima="this.idplurima" :idlista="localIdLista"></stepconfigmodelos>
  
        <!-- Conteúdo das outras etapas aqui -->
      </v-stepper-items>
    </v-stepper>
  </template>
  
  <script>
  import stepconfigmodelos from "./stepConfigModelos.vue";
  
  export default {
    name: "stepper",
    props:{
        idplurima: {
            type: Number
        },
        idlista: {
          type: Number
        }
    },
    components: {
      stepconfigmodelos
    },
    data() {
      return {
        localIdLista: this.idlista,
        e1: 1
      };
    }
  };
  </script>
  