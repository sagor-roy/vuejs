import { apiService } from '@/axios/apiService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([]);

    const fetchNotifications = async () => {
        try {
            const response = await apiService.get(`/notification`);
            if (response.data.status === 'success') {
                notifications.value = response.data.data;
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchNotifications();

    return {
        notifications,
        fetchNotifications
    };
});
