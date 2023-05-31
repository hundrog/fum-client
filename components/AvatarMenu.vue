<script setup>
defineProps(['user'])
const token = useCookie("token");
const getAvatarName = (email) => {
  let initials = "";
  email.split(".").slice(0, 2).forEach((word) => (initials += word.slice(0, 1)));

  return initials;
};

const logOut = async () => {
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

<template>
  <v-menu min-width="200px" rounded location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="primary">
          <span>{{ getAvatarName(user.email) }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="primary" size="small">
            <span>{{ getAvatarName(user.email) }}</span>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
            <NuxtLink to="/profile">
              <v-btn rounded variant="text"> Perfil </v-btn>
            </NuxtLink>
          <v-divider class="my-3"></v-divider>
          <v-btn rounded variant="text" @click="logOut"> Desconectar </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
