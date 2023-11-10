<template>
  <v-card
    shaped
    :color="color"
    class="mt-6"
    max-width="500"
    max-height="400"
    
    elevation="12"
  >
    <div class="d-flex">
      <div>
        <v-card-title
          class="text-sm-body-1 text-truncate title-limit-width font-weight-medium white--text font"
          no-wrap
        >
          {{ titulo }}
        </v-card-title>

        <v-card-text class="text-h4 white--text font-weight-bold">
          {{ qtd }}
        </v-card-text>
      </div>
      <v-img height="120" width="100" :src="img"></v-img>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardStatus",
  props: {
    qtd: Number,
    color: String,
    titulo: String,
    img: String
    
  },
};
</script>

