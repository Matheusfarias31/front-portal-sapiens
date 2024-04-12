<template>
  <div class="text-center">

    <v-overlay  z-index="6" :value="dialog" persistent  color="grey lighten-5">
      <div>
        <v-progress-circular size="120" indeterminate color="deep-purple lighten-2">
          <template v-slot:default>
            <v-img
              lazy-src="../../assets/Plurify2_Menu_500x500.png"
              max-height="80"
              max-width="80"
              src="../../assets/Plurify2_Menu_500x500.png"
            ></v-img>
          </template>
        </v-progress-circular>
      </div>
    </v-overlay> 
   
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