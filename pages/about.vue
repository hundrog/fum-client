<template>
  <v-row align="center" justify="center" style="height: 80vh" v-if="loading">
    <v-progress-circular
      indeterminate
      color="primary"
      size="150"
      width="7"
    />
  </v-row>
  <v-list lines="one">
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :title="item.name"
    ></v-list-item>
  </v-list>
</template>
<script setup>
import { nextTick, ref } from "vue";
const items = ref();
const loading = ref(true);

nextTick(async () => {
  const headers = { Authorization: `Bearer ${useCookie("token").value}` };

  await $fetch("http://localhost:8080/api/areas", {
    headers,
    pick: ['id', 'name'],
    async onResponse({ request, response, options }) {
      loading.value = false;
      items.value = response._data
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) return navigateTo("/login");
      if (response.status === 403) return navigateTo("/");
    },
  });
});
</script>
