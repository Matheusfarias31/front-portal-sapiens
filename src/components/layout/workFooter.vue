<template>
    <div>
      <v-footer :fixed="true" :padless="false">
        <v-card
          width="100%"
          class="text-center d-flex flex-row"
          color="#5E35B1"
          flat
          tile
        >
          <v-card-text class="white--text pa-2" outlined tile>
            <strong>{{ new Date().getFullYear() }}</strong>
            <v-img contain src="../../assets/bern.png" max-height="20"></v-img>
          </v-card-text>
        </v-card>
      </v-footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "workFooter",
    components: {},
  };
  </script>