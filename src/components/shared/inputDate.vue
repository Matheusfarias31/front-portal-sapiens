<template>
    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :rules="rules"
          v-model="dateFormatted"
          return-masked-value
          v-mask="'##/##/####'"
          :label="label"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          @blur="(date = parseDate(dateFormatted)), eventData()"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="pt"
        :min="min"
        v-model="date"
        no-title
        @input="(menu2 = false), eventData()"
      ></v-date-picker>
    </v-menu>
  </template>
  
  <script>
  export default {
    name: "inputDateText",
    components: {},
    props: {
      label: String,
      rules: Array,
      dateEdit: String,
      minimo: String,
    },
    created() {
      this.date = this.dateEdit;
    },
    data: () => ({
      date: null,
      dateFormatted: null,
      min: null,
      menu2: false,
    }),
  
    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date);
      },
    },
  
    watch: {
      minimo: function (newVal) {
        this.min = newVal;
      },
      dateEdit: function (newVal) {
        this.date = newVal;
      },
      date(newDate) {
        if (newDate === null) {
          this.dateFormatted = null;
        } else {
          this.dateFormatted = this.formatDate(newDate);
        }
      },
    },
  
    methods: {
      formatDate(date) {
        if (!date || date == null) {
          return null;
        }
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      },
      parseDate(date) {
        if (!date || date == null) return null;
  
        const [month, day, year] = date.split("/");
        return `${year}-${day.padStart(2, "0")}-${month.padStart(2, "0")}`;
      },
      eventData() {
        this.$emit("date", this.date);
      },
    },
  };
  </script>