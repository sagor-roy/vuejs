import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref({});

    const userWithTokenStore = (userWithToken) => {
        user.value = userWithToken;
    }

    const removeUserWithToken = () => {
        user.value = null;
        localStorage.removeItem('_user');
    }

    const loadUserFromLocalStorage = () => {
        const storedUser = JSON.parse(localStorage.getItem('_user'));
        if (storedUser) {
            user.value = storedUser;
        }
    };

    loadUserFromLocalStorage();

    return {
        user,
        userWithTokenStore,
        removeUserWithToken
    };
});
