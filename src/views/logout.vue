<template>
    <v-container fluid>
      <limparToken/>
    </v-container>
  </template>
  
  <script>
  import limparToken from '../components/shared/limparToken';
  
  export default {
    name: "logout",
  
    components: {
      limparToken
    },
  };
  </script>