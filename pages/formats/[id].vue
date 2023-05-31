<script setup>
import { ref, nextTick } from "vue";
const route = useRoute();
const fum = ref({});
const show = ref(false);
const loading = ref(true);


const journals = [
  {
    date: "05/30/23",
    to_name: "Elizabeth Barragan Rodriguez",
    from_name: "Diana Alexandra Espinosa Martinez",
    message: "Listo",
  },
  {
    date: "05/18/23",
    to_name: "Diana Alexandra Espinosa Martinez",
    from_name: "Elizabeth Barragan Rodriguez",
    message: "Falta tu firma Diana",
  },
  {
    date: "05/30/23",
    to_name: "Diana Ivette Vazquez Mercado",
    from_name: "Francisco Manuel Dueñas Gutierrez",
    message: "Todo bien",
    status: "Aprobado",
  },
  {
    date: "05/30/23",
    to_name: "Francisco Manuel Dueñas Gutierrez",
    from_name: "Diana Ivette Vazquez Mercado",
    message: "Favor de revisar los datos",
  },
];

nextTick(async () => {
  const uri = "http://localhost:8080/api/formats/" + route.params.id;
  const headers = { Authorization: `Bearer ${useCookie("token").value}` };

  await $fetch(uri, {
    headers,
    async onResponse({ request, response, options }) {
      fum.value = response._data;
      loading.value = false;
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) return navigateTo("/login");
      if (response.status === 403) return navigateTo("/");
    },
  });
});
</script>

<template>
  <v-row align="center" justify="center">
    <v-col sm="12" md="6">
      <v-card class="elevation-0" v-if="loading" ><LoadingCircle /></v-card>
      <v-card class="elevation-0" v-else>
        <div class="text-right">
          <v-card-title class="text-h4">
            {{ fum.employee_name }}
          </v-card-title>
          <v-card-subtitle class="text-h5">
            {{ fum.employee_number }}
          </v-card-subtitle>
        </div>
        <v-card-text class="py-16">
          <p>
            <span class="font-weight-bold">Puesto actual:</span>
            {{ fum.current_position_name }}
          </p>
          <p>
            <span class="font-weight-bold">Puesto del movimiento:</span>
            {{ fum.new_position_name }}
          </p>
          <br />
          <p>
            <span class="font-weight-bold">Jefe actual:</span>
            {{ fum.current_boss_name }}
          </p>
          <p>
            <span class="font-weight-bold">Jefe de la Vacante:</span>
            {{ fum.vacant_boss_name }}
          </p>
          <p>
            <span class="font-weight-bold"
              >Jefe Coordinador de la vacante:</span
            >
            {{ fum.vacant_coordinator_name }}
          </p>
        </v-card-text>
        <v-card-actions>
          <NuxtLink to="/">
            <v-btn text="Atras" />
          </NuxtLink>

          <v-spacer></v-spacer>
          Ver mas
          <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
          ></v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <v-timeline side="end" align="start">
                <v-timeline-item
                  size="x-small"
                  v-for="journal in journals"
                  dot-color="primary"
                >
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      Para: <strong>{{ journal.to_name }}</strong> -
                      {{ journal.date }}
                    </div>
                    <div>De: {{ journal.from_name }}</div>
                    <div>{{ journal.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>
