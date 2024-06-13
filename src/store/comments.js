import { apiService } from '@/axios/apiService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentStore = defineStore('comment', () => {
    const comments = ref([]);

    const fetchComments = async (videoId) => {
        try {
            const response = await apiService.get(`/comment/${videoId}`);
            if (response.data.status === 'success') {
                comments.value = response.data.data;
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = async (commentData) => {
        try {
            const response = await apiService.post(`/comment`, commentData);
            if (response.data.status === 'success') {
                await fetchComments(commentData?.video_id);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        comments,
        fetchComments,
        addComment
    };
});
