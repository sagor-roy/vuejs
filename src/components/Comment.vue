<template>
    <div class="flex text-purple-500 relative gap-x-2 my-2">
        <span class="material-symbols-outlined text-purple-500 text-3xl">account_circle</span>
        <div class="w-full relative"
            :class="comment.replies_count ? 'parent_drawing' : 'custom_drawing', comment.parent_id ? 'child' : 'parent'">
            <h1 class="font-semibold text-lg mt-1">
                @{{ comment.user.name }} <span class="text-xs font-normal">{{ relativeTime }}</span>
            </h1>
            <p class="text-sm italic mt-1">
                <span v-if="parentUserName" class="bg-purple-100 p-1 rounded-lg">@{{ parentUserName }}</span> {{
                comment.comment }}
            </p>
            <div class="flex gap-x-3 mt-4">
                <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_up</span><span>2.4k</span>
                </button>
                <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_down</span><span>1k</span>
                </button>
                <button type="button" @click="replyHandler" class="flex items-center gap-x-1">Reply</button>
            </div>
            <div class="items-start mt-4 gap-x-2" :class="repliesFormId ? 'flex' : 'hidden'">
                <span class="material-symbols-outlined text-purple-500 text-4xl">account_circle</span>
                <form class="flex flex-col gap-y-3 items-end w-full">
                    <input type="text"
                        class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                        placeholder="Add a Comment...." />
                    <button type="submit" class="bg-purple-300 text-purple-600 w-36 px-3 py-2 rounded-full">
                        Comment
                    </button>
                </form>
            </div>
            <!-- <button class="flex mt-2 items-center text-sm text-blue-500">
                <span class="material-symbols-outlined">keyboard_arrow_down</span>
                <span>50 replies</span>
            </button> -->

            <template v-if="comment.replies.length > 0">
                <Comment v-for="reply in comment.replies" :key="reply.id" :comment="reply"
                    :parentUserName="comment.user.name" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { formatDistanceToNow } from 'date-fns'

const props = defineProps(['comment', 'parentUserName']);
const comment = ref(props.comment);
const parentUserName = ref(props.parentUserName);
const repliesFormId = ref(false);


const replyHandler = (commentId) => {
    repliesFormId.value = !repliesFormId.value
}


const relativeTime = computed(() => formatRelativeTime(props.comment.created_at));


function formatRelativeTime(date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

</script>
