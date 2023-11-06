<template>
    <div>
    </div>

</template>

<script>
export default {
  name: "limparToken",   

  created() {
    this.limparToken()
  },

  methods: {
    limparToken(){
        localStorage.removeItem('tokenSistema_1017')
        this.$router.push({name:'login'})

    }
  }


}
</script>