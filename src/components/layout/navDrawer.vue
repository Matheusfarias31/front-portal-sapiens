<template>
    <div>
      <v-navigation-drawer app :value="drawer" light color="#EDE7F6">
        <v-list-item class="pt-3 pl-9 mb-4 text-center">
          <v-img
            max-height="180"
            max-width="180"
            src="../../assets/BernPlurimas_500x500.png"
          ></v-img>
        </v-list-item>
        <v-divider light></v-divider>
  
        <v-list-item link class="">
          <v-list-item-content>
            <v-list-item-subtitle
              ><v-icon color="#7986CB" size="20">mdi-email-outline</v-icon>
              {{ emailUser }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              ><v-icon color="#7986CB" size="20">mdi-shield-check</v-icon
              >{{ skillUser }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list nav>
          <v-list-item-group v-if="skillUser == 'ADMINISTRADOR'" color="#5E35B1">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
  
          <v-list-item-group color="#5E35B1">
            <v-list-item to="/portalplurimas/plurimas">
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted-type</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Plúrimas</v-list-item-title>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group color="#5E35B1">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-format-list-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Minhas Plúrimas</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
            
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  import config from "@/config/store";  
  export default {
    name: "navDrawer",
    components: { },
    data() {
      return {        
        cruds: [
          ["Create", "mdi-plus-outline"],
          ["Read", "mdi-file-outline"],
          ["Update", "mdi-update"],
          ["Delete", "mdi-delete"],
        ],  
        emailUser: config.user().EMAIL,
        skillUser: config.user().SKILL,
        idUser: config.user().ID_USUARIO,        
      };
    },
    props: {
      drawer: {
        type: Boolean,
        default: true,
      },
    },        
    methods: { 
      
    },
  };
  </script>

  <style>
  .fixed-content {
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    bottom: 0px;
    overflow: hidden;
  }
  
  .overlay {
    position: relative;
    display: inline-block;
  }
  
  .overlay .overlay-content {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 36%;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.388);
  }
  .profile-name {
    color: #d9d0d0;
    padding-left: 5%;
    padding-top: 2%;
  }
  </style>