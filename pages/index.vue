<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const fums = [
  {
    name: "Julion Alvarez",
    status: "pendiente",
    area: "SASSO",
    date: "11-04-2023",
  },
  {
    name: "America Chavez",
    status: "Completo",
    area: "Almacen",
    date: "01-05-2023",
  },
  {
    name: "Hermenegildo Galeana",
    status: "pendiente",
    area: "SASSO",
    date: "01-01-2023",
  },
  {
    name: "Fancy Pants",
    status: "pendiente",
    area: "HHRR",
    date: "05-05-2023",
  },
  {
    name: "Jenifer Lopez",
    status: "pendiente",
    area: "SASSO",
    date: "04-03-2023",
  },
  {
    name: "Pepe Pecas",
    status: "pendiente",
    area: "SASSO",
    date: "08-01-2023",
  },
  {
    name: "Omar Rollo",
    status: "pendiente",
    area: "SASSO",
    date: "11-05-2023",
  },
  {
    name: "Christian Mignion",
    status: "pendiente",
    area: "SASSO",
    date: "01-02-2023",
  },
  {
    name: "Felipe Cuevas",
    status: "pendiente",
    area: "SASSO",
    date: "10-02-2023",
  },
  {
    name: "Daniel Haro",
    status: "pendiente",
    area: "SASSO",
    date: "28-04-2023",
  },
  {
    name: "Ulises Mei",
    status: "pendiente",
    area: "SASSO",
    date: "12-02-2023",
  },
  {
    name: "Oscar Renta",
    status: "pendiente",
    area: "SASSO",
    date: "12-12-2022",
  },
  {
    name: "Alejandra Gris",
    status: "pendiente",
    area: "SASSO",
    date: "02-02-2023",
  },
  {
    name: "Hipocon Driaco",
    status: "pendiente",
    area: "SASSO",
    date: "01-02-2023",
  },
  {
    name: "Olga Pereira",
    status: "pendiente",
    area: "SASSO",
    date: "01-05-2023",
  },
  {
    name: "Eluviera Presente",
    status: "pendiente",
    area: "SASSO",
    date: "01-02-2023",
  },
];

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const formatSelect = (month) => {
  return `${monthNames[month?.month]} - ${month?.year}`;
};

const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

const search = ref("");

const filteredList = () => {
  return fums.filter(
    (obj) =>
      obj.name.toLowerCase().includes(search.value.toLowerCase()) &&
      obj.date.split("-")[1].includes((month.value.month + 1).toString()) &&
      obj.date.split("-")[2].includes(month.value.year.toString())
  );
};
</script>

<template>
  <v-toolbar density="compact">
    <v-col sm="2">
      <VueDatePicker
        v-model="month"
        month-picker
        :teleport="true"
        :max-date="new Date()"
        auto-apply
        locale="es"
      >
        <template #trigger>
          <v-btn prepend-icon="mdi-calendar">{{ formatSelect(month) }}</v-btn>
        </template>
      </VueDatePicker>
    </v-col>
    <v-spacer></v-spacer>
    <v-text-field
      hide-details
      label="Search"
      prepend-icon="mdi-magnify"
      single-line
      v-model="search"
    ></v-text-field>
  </v-toolbar>
  <v-table fixed-header height="80vh">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Status</th>
        <th class="text-left">Area</th>
        <th class="text-left">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredList()" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
        <td>{{ item.area }}</td>
        <td>{{ item.date }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss">
.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.dp__theme_light {
--dp-primary-color: #C62828;
}
</style>
