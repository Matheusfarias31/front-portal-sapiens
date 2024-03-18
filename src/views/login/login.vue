<template>
    <v-row>
      <v-col cols="7">
        <div class="espacoLogo" style="position: relative; z-index: 2;">
        <v-img
          max-width="700"
          max-height="700"
          src="../../assets/Plurify2.png"
          class="mx-auto"
        ></v-img>
        </div>
        <div class="particles fixed-content">
          <div id="particles-js"></div>
        </div>
  
      </v-col>
      <v-col cols="5" class="colorcolum2">
        <cardLogin v-if="form" class="espacoTop" @statusForm="form=$event"  />
        <cardSolicitarSenha v-if="!form"  class="espacoTop" @statusForm="form=$event" />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import "particles.js";
  import cardLogin from "@/components/login/card.vue";
  import cardSolicitarSenha from "@/components/login/solicitarSenha.vue";
  
  export default {
    name: "login",
    components: {
      cardLogin,
      cardSolicitarSenha
    },
    data:()=>({
      form:true,
      teste1:null
    }),
    mounted() {
      this.initParticles();
    },
    watch: {
      notIsLayout(value) {
        if (!value) {
          this.$nextTick(() => {
            this.initParticles();
          });
        }
      },
    },
    methods: {
      teste(event){
        console.log(event)
      },
      initParticles() {
        window.particlesJS("particles-js", {
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 700,
              },
            },
            color: {
              value: "#9575CD",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#9575CD",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#9575CD",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: false,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        });
      },
    },
  };
  </script> 
  
  
  <style>
  .colorcolum2 {
    background-image: linear-gradient(
      to right top,
      #B39DDB,
      #B39DDB,
      #B39DDB,
      #D1C4E9,
      #EDE7F6
    );
  }
  
  .espacoTop {
    padding-top: 20%;
  }
  .espacoLogo {
    padding-top: 20%;
  }
  
  .fixed-content {
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    bottom: 0px;
    overflow: hidden;
  }
  
  
  #particles-js {
    height: 100%;
    width: 100%;
  }
  </style>
  