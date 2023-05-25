<template>
  <div class="pt-1"></div>
  <p><strong>E-mail:</strong> {{ user.email }}</p>
  <p><strong>Area:</strong> {{ user.area }}</p>
  <div class="pa-16"></div>
  <div class="pa-10"></div>
  <div align="center" justify="center">
    <v-btn @click="logOut"> Desconectar </v-btn>
  </div>
</template>

<script setup>
const token = useCookie("token");
const user = useCookie("user").value;
async function logOut() {
  const headers = { Authorization: `Bearer ${token.value}` };
  await $fetch("http://localhost:8080/api/users/sign_out", {
    headers,
    method: "DELETE",
    async onResponse({ request, response, options }) {
      token.value = undefined;
      navigateTo("/login");
    },
  });
}
</script>
