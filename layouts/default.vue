<script setup>
import { ref } from "vue";
const getRoute = (text) => {
  if (text === "Home") return "/";

  return `/${text.toLowerCase()}`;
};
const drawer = ref(true);
const links = [
  ["mdi-table", "Home"],
  ["mdi-view-dashboard-outline", "Statistics"],
  ["mdi-bell", "Notifications"],
  ["mdi-information-outline", "About"],
];
</script>

<template>
  <v-app id="inspire">
    <v-app-bar color="amber-accent-3">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>CEDIS - FUM</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet color="red-darken-4" class="pa-4">
        <div class="text-center">
          <v-avatar class="mb-4" color="amber-lighten-3" size="64">DV</v-avatar>

          <div>Diana Vazquez</div>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <NuxtLink :to="getRoute(text)">
            <v-list-item-title>{{ text }}</v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
