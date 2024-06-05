<template>
  <div>
    <ul>
      <template v-if="isLoggedIn">
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><button @click="logout">Logout</button></li>
      </template>

      <li v-else><router-link to="/login">Login</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const isLoggedIn = computed(() => {
  return store.getters.getToken;
})

const logout = () => {
  localStorage.removeItem('token')
  store.commit('clearToken');
  router.push({ path: '/login' });
}
</script>