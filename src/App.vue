<template>
  <v-app>
    
    <v-main
    :class="{ 'color-layout': notIsLayout, 'color-not-layout': !notIsLayout }"
    >
      <v-container>
        <router-view class="fixed-content2" /> 
      </v-container>
    </v-main>

    
  </v-app>
</template>

<script>

export default {
  name: "home-app",
  components: {
    
  },

  data() {
    return {
      drawer: true
    };
  },
  computed: {
    notIsLayout() {
      return (
        this.$route.name !== "login"
      );
    },
  },

};
</script>

<style>
.color-layout {
  background-color: rgb(236, 240, 242);
}
.fixed-content2 {
  position: absolute;
  top: 10px;
  left: 20px;
  right: 20px;
  bottom: 0px;
  overflow-x: hidden;
}
.color-not-layout {
background: #B39DDB;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #B39DDB, #B39DDB);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #B39DDB, #B39DDB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>

