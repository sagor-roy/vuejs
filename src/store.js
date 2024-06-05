// store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            token: localStorage.getItem('token') || ""
        }
    },
    mutations: {
        accessToken(state, payload) {
            state.token = payload
        },
        clearToken(state) {
            state.token = "";
        },
    },
    actions: {
        // your action functions
    },
    getters: {
        getToken: state => state.token
    }
});

export default store;
