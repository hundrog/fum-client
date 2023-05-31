<script setup>
import { ref } from "vue";
const profile = useCookie("user").value;
const getRoute = (text) => {
  if (text === "Home") return "/";

  return `/${text.toLowerCase()}`;
};
const drawer = ref(true);
const links = [
  ["mdi-table", "Home"],
  ["mdi-plus-box-multiple-outline", "Create"],
  ["mdi-view-dashboard-outline", "Statistics"],
  ["mdi-bell-outline", "Notifications"],
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

      <AvatarMenu :user="profile" />
      <div class="mx-3"></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color =grey-lighten-4>
      <v-sheet color="red-darken-4" class="pa-4">
        <div class="text-center">
          <div>{{ profile.name }}</div>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <NuxtLink :to="getRoute(text)" class="nuxt-link-active">
            <v-list-item-title>{{ text }}</v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="pt-12">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.nuxt-link-active {
  color: #212121;
  text-decoration-line: none;
}
</style>
