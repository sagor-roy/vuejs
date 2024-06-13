<template>
    <div class="flex text-purple-500 relative gap-x-2 my-2">
        <span class="material-symbols-outlined text-purple-500 text-3xl">account_circle</span>
        <div class="w-full relative">
            <h1 class="font-semibold text-lg mt-1">
                @{{ comment.user_name }} <span class="text-xs font-normal">{{ comment.created_time }}</span>
            </h1>
            <p class="text-sm italic mt-1">
                <span v-if="parentUserName" class="bg-purple-100 p-1 rounded-lg">@{{ parentUserName }}</span> {{
                    comment.comment }}
            </p>
            <div class="flex gap-x-3 mt-4">
                <button @click="likeHandler(comment)" class="flex items-center gap-x-1">
                    <span
                        :class="comment?.auth_user_like?.like == 1 ? 'material-icons' : 'material-symbols-outlined'">thumb_up</span><span>{{
                    comment.like_count > 0 ? comment.like_count : '' }}</span>
                </button>
                <button @click="dislikeHandler(comment)" class="flex items-center gap-x-1">
                    <span
                        :class="comment?.auth_user_like?.dislike == 1 ? 'material-icons' : 'material-symbols-outlined'">thumb_down</span><span>{{
                    comment.dislike_count > 0 ? comment.dislike_count : '' }}</span>
                </button>
                <button type="button" @click="replyHandler" class="flex items-center gap-x-1">Reply</button>
            </div>
            <div class="items-start mt-4 gap-x-2" :class="repliesFormId ? 'flex' : 'hidden'">
                <span class="material-symbols-outlined text-purple-500 text-4xl">account_circle</span>
                <form @submit.prevent="replySubmitHandler(comment)" class="flex flex-col gap-y-3 items-end w-full">
                    <input required type="text" v-model="replyInput"
                        class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                        placeholder="Add a Comment...." />
                    <div>
                        <button @click="replyHandler" type="submit"
                            class="bg-purple-400 text-purple-800 w-24 px-2 py-2 rounded-full me-3">
                            Cancel
                        </button>
                        <button type="submit" class="bg-purple-300 text-purple-600 w-28 px-3 py-2 rounded-full">
                            Comment
                        </button>
                    </div>
                </form>
            </div>
            <button type="button" @click="repliesHiddenShowHandler" v-if="comment.replies_count > 0"
                class="flex mt-2 items-center text-sm text-blue-500">
                <span class="material-symbols-outlined">keyboard_arrow_down</span>
                <span>Replies</span>
            </button>

            <template v-if="replyStatus">
                <Comment v-for="reply in comment.replies" :key="reply.id" :comment="reply"
                    :parentUserName="comment.user_name" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/store/comments';
import { apiService } from '@/axios/apiService';

const authStore = useAuthStore();
const commentStore = useCommentStore();
const { addComment, fetchComments } = commentStore;
const { user } = storeToRefs(authStore);

const props = defineProps(['comment', 'parentUserName']);
const emit = defineEmits(['replySubmitted']);
const comment = ref(props.comment);
const parentUserName = ref(props.parentUserName);
const repliesFormId = ref(false);
const replyInput = ref("");
const replyStatus = ref(false);

watch(
    () => props.comment,
    (newComment) => {
        comment.value = newComment;
    }
);

const replySubmitHandler = async (comment) => {
    await addComment({ user_id: user.value.user.id, video_id: comment.video_id, comment: replyInput.value, parent_id: comment.id })
    replyInput.value = "";
    repliesFormId.value = false
    replyStatus.value = true
}

const replyHandler = () => repliesFormId.value = !repliesFormId.value;
const repliesHiddenShowHandler = () => replyStatus.value = !replyStatus.value;







const handleLikeDislike = async (comment, action) => {
    const isLike = action === 'like';
    const isDislike = action === 'dislike';
    const user = comment.auth_user_like
    try {
        const response = await apiService.post(`/comment-like`, {
            like: isLike ? (user.like === 1 ? 0 : 1) : (user.like === 1 ? 0 : user.like),
            dislike: isDislike ? (user.dislike === 1 ? 0 : 1) : (user.dislike === 1 ? 0 : user.dislike),
            comment_id: comment.id
        });
        if (response.data.status === 'success') {
            await fetchComments(comment.video_id);
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};

const likeHandler = (comment) => handleLikeDislike(comment, 'like');
const dislikeHandler = (comment) => handleLikeDislike(comment, 'dislike');

</script>
