<template>
  <v-row justify="center">
    <v-col cols="12">
      <p class="text-center text-md-h4 text-no-wrap">{{ user.name }}</p>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col sm="12" md="5">
      <v-tabs v-model="tab" color="primary" grow>
        <v-tab value="0">Detalles</v-tab>
        <v-tab value="1">Contraseña</v-tab>
      </v-tabs>
      <v-card style="height: 50vh">
        <v-card-text>
          <v-window v-model="tab" class="pt-12">
            <v-window-item value="0">
              <p><strong>E-mail:</strong> {{ user.email }}</p>
              <p><strong>Area:</strong> {{ user.area_name }}</p>
              <p><strong>Puesto:</strong> {{ user.position }}</p>
            </v-window-item>

            <v-window-item value="1"> <ProfileChangePassword /> </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const tab = ref();
const token = useCookie("token");
const user = ref({});

const getUser = async () => {
  const headers = { Authorization: `Bearer ${token.value}` };
  await $fetch("http://localhost:8080/api/users/current", {
    headers,
    async onResponse({ request, response, options }) {
      user.value = response._data;
    },
  });
};

onMounted(() => {
  getUser();
});
</script>
