import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
  themes: {
    light: {
      primary: colors.indigo.lighten2, 
      secondary: colors.indigo.lighten3, 
      accent: colors.indigo.lighten4, 
      accent1:colors.indigo.lighten5, 
      error: colors.red.lighten3, 
    },
  },
},
});
