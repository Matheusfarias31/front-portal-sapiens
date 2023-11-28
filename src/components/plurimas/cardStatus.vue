<template>
  <v-card shaped :color="color" class="mt-6" max-width="500" max-height="400" elevation="4" min-width="200">
    <div class="d-flex">
      <div>
        <v-card-title class="text-sm-body-1 title-limit-width font-weight-medium white--text font" no-wrap>
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

<style scoped>
.title-limit-width {
  max-width: 200px;  
  overflow: hidden;
  text-overflow: ellipsis;  
  white-space: nowrap;  
}
</style>

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

