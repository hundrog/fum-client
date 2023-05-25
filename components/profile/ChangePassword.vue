<template>
  <form @submit.prevent="submit">
    <v-text-field
      name="current_password"
      label="Conraseña Actual"
      v-model="current_password"
      type="password"
      autocomplete="current-password"
    ></v-text-field>
    <v-text-field
      name="current_password"
      label="Nueva Contraseña"
      v-model="current_password"
      type="password"
      autocomplete="new-password"
    ></v-text-field>
    <v-text-field
      name="current_password"
      label="Confirmar Nueva Contraseña"
      v-model="current_password"
      type="password"
      autocomplete="new-password"
    ></v-text-field>
    <div class="text-center py-4">
      <v-btn block size="large" class="me-4" type="submit">
        Cambiar Contraseña
      </v-btn>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
const user = useCookie("user").value;
const current_password = ref("");
</script>
