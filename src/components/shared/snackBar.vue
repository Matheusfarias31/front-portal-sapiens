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
        this.color =  data.status ? 'success' : 'red'
        this.timer = data.timer || 3000
        this.icon = data.status ? 'mdi-check' :'mdi-alert-circle-outline' 
        this.showSnackbar = true
      }
    }
  }
  </script>