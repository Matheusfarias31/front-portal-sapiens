<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" color="purple lighten-2">
        <!-- Nome do passo 1 -->
        Configurar Campos dos Documentos
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" color="deep-orange lighten-2">
        <!-- Nome do passo 2 -->
        Configurar Campos da Lista
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e2 > 3" step="3" color="pink lighten-2">
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
      <stepconfigmodelos :idplurima="this.idplurima" :idlista="localIdLista" ref="stepconfigmodels"
        @next-step="nextStep"></stepconfigmodelos>

      <stepconfigurarcampos :idplurima="this.idplurima" :idlista="localIdLista" ref="stepconfigurarmodelos"
        @next-step="nextStep" @back-step="backstep">
      </stepconfigurarcampos>

      <stepprelista :idplurima="this.idplurima" :idlista="localIdLista" ref="stepprelista" @next-step="nextStep"
        @back-step="backstep">
      </stepprelista>

      <!-- Conteúdo das outras etapas aqui -->
    </v-stepper-items>

    <loading ref="loading" />

  </v-stepper>
</template>

<script>
import stepconfigmodelos from "./stepConfigModelos.vue";
import stepconfigurarcampos from "./stepConfigurarCampos.vue"
import stepprelista from "./preLista.vue";
import loading from "@/components/shared/loading.vue";

export default {
  name: "stepper",
  props: {
    idplurima: {
      type: Number
    },
    idlista: {
      type: Number
    }
  },
  components: {
    stepconfigmodelos, stepconfigurarcampos, stepprelista, loading
  },
  mounted() {
    this.$refs.stepconfigmodels.$emit('reset-component');
    this.$refs.stepconfigmodels.$emit('start-component', true);
  },
  data() {
    return {
      localIdLista: this.idlista,
      e1: 1
    };
  },
  methods: {
    resetComponents() {
      this.$refs.stepconfigmodels.$emit('reset-component');
      this.$refs.stepconfigurarmodelos.$emit('reset-component');
    },
    nextStep() {
      if (this.e1 < 4) {

        switch (this.e1) {
          case 1:
            this.$refs.loading.dialog = true;
            this.$refs.stepconfigmodels.$emit('reset-component');
            this.$refs.stepconfigurarmodelos.$emit('reset-component');
            this.$refs.stepconfigurarmodelos.$emit('start-component');
            this.$refs.loading.dialog = false;
            break;
          case 2:
            this.$refs.loading.dialog = true;
            this.$refs.stepconfigmodels.$emit('reset-component');
            this.$refs.stepconfigurarmodelos.$emit('reset-component');
            this.$refs.stepprelista.$emit('reset-component');
            this.$refs.stepprelista.$emit('start-component');
            this.$refs.loading.dialog = false;
            break;

        }



        this.e1++;
      }
    },
    backstep() {
      if (this.e1 > 1) {

        switch (this.e1) {
          case 2:
            this.$refs.stepconfigurarmodelos.$emit('reset-component');
            this.$refs.stepconfigmodels.$emit('reset-component');
            this.$refs.stepconfigmodels.$emit('start-component');
            break;
          case 3:            
            this.$refs.stepprelista.$emit('reset-component');            
            this.$refs.stepconfigmodels.$emit('reste-component');
            this.$refs.stepconfigurarmodelos.$emit('reset-component');            
            this.$refs.stepconfigurarmodelos.$emit('start-component');            
            break;

        }



        this.e1--; // Incrementa o valor de e1 para avançar para o próximo passo
      }
    }
  }
};
</script>