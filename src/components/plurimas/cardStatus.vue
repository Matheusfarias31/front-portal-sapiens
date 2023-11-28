<template>
  <v-card shaped :color="color" class="{ 'mt-6': !isClicked, 'mt-10': isClicked, 'clicked-card': isClicked }" max-width="500" max-height="400" :elevation="elevation" min-width="200"
    @click="handleCardClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="d-flex" @click="handleCardClick">
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

.clicked-card {
  box-shadow: 0 0 10px 3px #ffcc00; /* Substitua a cor desejada */
}

.card-wrapper {
  cursor: pointer;
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
  data() {
    return {
      isClicked: false,
      elevation: 2
    }
  },
  methods: {
    handleCardClick() {
      this.isClicked = !this.isClicked;
      //this.elevation = this.isClicked ? 12 : 2;
      this.$emit("filtroClicado", this.titulo);
    },
    handleMouseEnter() {
      if (!this.isClicked) {
        this.elevation = 12;
      }
    },
    handleMouseLeave() {
      if (!this.isClicked) {
        this.elevation = 2;
      }
    }
  }
};
</script>

