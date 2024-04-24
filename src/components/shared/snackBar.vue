<template>
    <v-snackbar
        :color="color"
        :timeout="timer"
        v-model="showSnackbar"
    >
     <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="showSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      <v-icon left>{{icon}}</v-icon><b>{{message}}</b>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    name: "vtoast",
    data() {
      return{
        showSnackbar: false,
        message: '',
        color: 'success',
        icon: 'mdi-check',
        timer: 5000
      }
    },
    methods:{
      show(data) {
        this.message = data.message || 'faltando Mensagem'
        this.color =  this.returnColor(data.status)
        this.timer = data.timer || 3000
        this.icon = this.returnIcon(data.status)
        this.showSnackbar = true
      },
      returnColor(status){
        if(status == 'alert'){
          return 'yellow darken-4'          
        }else if(status){
          return 'teal darken-4'
        }else{
          return 'red darken-4'
        }
      },
      returnIcon(status){
        if(status == 'alert'){
          return 'mdi-alert-circle-outline'          
        }else if(status){
          return 'mdi-check-circle-outline'
        }else{
          return 'mdi-alert'
        }
      }
    }
  }
  </script>