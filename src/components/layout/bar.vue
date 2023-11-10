<template>
    <div>
      <v-app-bar dark app color="deep-purple lighten-2" elevation="10">
        <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              slot="activator"
              v-bind="attrs"
              v-on="on"
              color="transparent"
              elevation="0"
            >
              <span class="pr-2"> {{nameUser}} </span>
              <v-avatar size="32">
                <gravatar :size="30" email="email@bernhoeft.com.br" />
              </v-avatar>
              <v-divider></v-divider>
              <v-icon size="22">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list v-if="skillUser == 'ADMINISTRADOR'">
            
            <v-list-item to="/portalplurimas/admin/usuarios">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item>  
          </v-list>
        </v-menu>
  
        <v-btn class="pr-2 ps-3" to="/portalplurimas/logout" icon>
          <v-icon dense> mdi-logout </v-icon>
        </v-btn>
      </v-app-bar>
    </div>
  </template>
  
  <script>
  import gravatar from "vue-gravatar";  
  import config from "../../config/store";
  
  export default {
    name: "App",
    components: {
      gravatar      
    },
    data: () => ({      
      nameUser: config.user().NOME,
      emailUser: config.user().EMAIL,
      skillUser: config.user().SKILL,
    }),
    props: {
      drawer: Boolean,
    },
    methods: {
      toggleDrawer() {
        this.$emit("update:drawer");
      },
    },
  };
  </script>
  