<script setup>
import { ref, nextTick } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const statusColor = (status) => {
  return status === "0" ? "1" : "grey-darken-2";
};
const fums = ref([]);
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
const loading = ref(true);

const filteredList = () => {
  return fums.value.filter((obj) =>
    obj.employee_name.toLowerCase().includes(search.value.toLowerCase())
  );
};

const handleDate = (modelData) => {
  month.value = modelData;
  getFums();
};

onMounted(() => {
  getFums();
});

const updateFums = (loadedFums) => {
  fums.value = loadedFums;
};

async function getFums() {
  nextTick(async () => {
    await $fetch("http://localhost:8080/api/formats", {
      async onRequest({ request, options }) {
        loading.value = true
        options.headers = options.headers || {}
        options.query = options.query || {}
        options.headers.authorization = `Bearer ${useCookie("token").value}`
        options.query = { month: month.value.month + 1, year: month.value.year, }
      },
      async onResponse({ request, response, options }) {
        updateFums(response._data);
        loading.value = false
      },
      async onResponseError({ request, response, options }) {
        if (response.status === 401) return navigateTo("/login");
        if (response.status === 403) return navigateTo("/");
      },
    });
  });
}
</script>

<template>
  <v-toolbar density="compact">
    <v-col lg="3">
      <VueDatePicker
        v-model="month"
        month-picker
        :teleport="true"
        :max-date="new Date()"
        auto-apply
        locale="es"
        @update:model-value="handleDate"
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
  <LoadingCircle v-if="loading"/>
  <v-table fixed-header height="80vh" v-else>
    <thead>
      <tr>
        <th class="text-left">Empleado</th>
        <th class="text-left">Nueva posicion</th>
        <th class="text-left">Fecha de Creacion</th>
        <th class="text-left">Detalles</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredList()" :key="item.name">
        <td>{{ item.employee_name }}</td>
        <!-- <td>
          <v-chip class="ma-2" :color="statusColor(item.status)">{{
            item.status
          }}</v-chip>
        </td> -->
        <td>{{ item.new_position_name }}</td>
        <td>{{ item.creation_date }}</td>
        <td>
          <NuxtLink :to="'formats/' + item.id">
          <v-btn
          class="ma-2"
          variant="text"
          icon="mdi-eye-outline"
          size="small"
          >
        </v-btn>
      </NuxtLink>
        </td>
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
  --dp-primary-color: #c62828;
}
</style>
