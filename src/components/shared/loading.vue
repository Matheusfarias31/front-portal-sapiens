<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
      
        persistent
        width="300"
      >
        <v-card
          color="#5E35B1"
          dark
        >
          <v-card-text>
            Aguarde o processamento
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
  export default {
    name: "carregamento",
    data: () => ({
      dialog: false,
    }),
  };
  </script>
  
  <style >
  .v-progress-circular {
    margin: 15rem;
  }
  
  .moverlogo {
    margin-right: 30%;
  }
  
  .offset {
    top: -24px;
    position: relative;
  }
  </style>