<template lang="">
  <div class="container mx-auto">
    <div class="grid grid-cols-6 gap-x-5 mx-4 my-10">
      <div class="col-span-6 lg:col-span-4">
        <iframe
          width="100%"
          class="rounded-lg shadow-lg"
          id="iframe"
          :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&unmute=0&enablejsapi=1`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        <div class="my-5">
          <h4 class="font-semibold text-purple-500 text-xl">
            {{ videos?.details?.title }}
          </h4>

          <div
            class="bg-purple-100 my-4 inline-flex text-purple-500 items-center py-3 px-4 gap-x-3 rounded-full"
          >
            <button class="flex items-center gap-x-1">
              <span class="material-symbols-outlined">thumb_up</span
              ><span>5k</span>
            </button>
            |
            <button class="flex items-center gap-x-1">
              <span class="material-symbols-outlined">thumb_down</span
              ><span>2k</span>
            </button>
          </div>

          <div class="bg-purple-100 rounded-lg p-4 text-purple-500">
            <p v-html="videos?.details?.description"></p>
          </div>

          <div class="mt-5">
            <h1 class="font-bold text-2xl text-purple-500">2,550 Comments</h1>
            <div class="flex items-start mt-4 gap-x-2">
              <span class="material-symbols-outlined text-purple-500 text-4xl"
                >account_circle</span
              >
              <form class="flex flex-col gap-y-3 items-end w-full">
                <input
                  type="text"
                  class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                  placeholder="Add a Comment...."
                />
                <button
                  type="submit"
                  class="bg-purple-300 text-purple-600 w-36 px-3 py-2 rounded-full"
                >
                  Comment
                </button>
              </form>
            </div>

            <div class="flex text-purple-500 gap-x-2 my-2">
              <span class="material-symbols-outlined text-purple-500 text-3xl"
                >account_circle</span
              >
              <div class="">
                <h1 class="font-semibold text-lg mt-1">
                  @John Doe <span class="text-xs font-normal">1 year ago</span>
                </h1>
                <p class="text-sm italic mt-1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  quidem, modi provident a dolor inventore similique sint
                  voluptatum deserunt cupiditate!
                </p>
                <div class="flex gap-x-3 mt-4">
                  <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_up</span
                    ><span>2.4k</span>
                  </button>
                  <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_down</span
                    ><span>1k</span>
                  </button>
                  <button class="flex items-center gap-x-1">Reply</button>
                </div>
                <div class="flex items-start mt-4 gap-x-2">
                  <span
                    class="material-symbols-outlined text-purple-500 text-4xl"
                    >account_circle</span
                  >
                  <form class="flex flex-col gap-y-3 items-end w-full">
                    <input
                      type="text"
                      class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                      placeholder="Add a Comment...."
                    />
                    <button
                      type="submit"
                      class="bg-purple-300 text-purple-600 w-36 px-3 py-2 rounded-full"
                    >
                      Comment
                    </button>
                  </form>
                </div>
                <button class="flex mt-2 items-center text-sm text-blue-500">
                  <span class="material-symbols-outlined"
                    >keyboard_arrow_down</span
                  >
                  <span>50 replies</span>
                </button>

                <div class="flex text-purple-500 gap-x-2">
                  <span
                    class="material-symbols-outlined text-purple-500 text-3xl"
                    >account_circle</span
                  >
                  <div class="">
                    <h1 class="font-semibold text-lg mt-1">
                      @John Doe
                      <span class="text-xs font-normal">1 year ago</span>
                    </h1>
                    <p class="text-sm italic mt-1">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Fuga quidem, modi provident a dolor inventore similique
                      sint voluptatum deserunt cupiditate!
                    </p>
                    <div class="flex gap-x-3 mt-4">
                      <button class="flex items-center gap-x-1">
                        <span class="material-symbols-outlined">thumb_up</span
                        ><span>2.4k</span>
                      </button>
                      <button class="flex items-center gap-x-1">
                        <span class="material-symbols-outlined">thumb_down</span
                        ><span>1k</span>
                      </button>
                      <button class="flex items-center gap-x-1">Reply</button>
                    </div>
                    <div class="flex items-start mt-4 gap-x-2">
                      <span
                        class="material-symbols-outlined text-purple-500 text-4xl"
                        >account_circle</span
                      >
                      <form class="flex flex-col gap-y-3 items-end w-full">
                        <input
                          type="text"
                          class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                          placeholder="Add a Comment...."
                        />
                        <button
                          type="submit"
                          class="bg-purple-300 text-purple-600 w-36 px-3 py-2 rounded-full"
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex text-purple-500 gap-x-2 my-2">
              <span class="material-symbols-outlined text-purple-500 text-3xl"
                >account_circle</span
              >
              <div class="">
                <h1 class="font-semibold text-lg mt-1">
                  @John Doe <span class="text-xs font-normal">1 year ago</span>
                </h1>
                <p class="text-sm italic mt-1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  quidem, modi provident a dolor inventore similique sint
                  voluptatum deserunt cupiditate!
                </p>
                <div class="flex gap-x-3 mt-4">
                  <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_up</span
                    ><span>2.4k</span>
                  </button>
                  <button class="flex items-center gap-x-1">
                    <span class="material-symbols-outlined">thumb_down</span
                    ><span>1k</span>
                  </button>
                  <button class="flex items-center gap-x-1">Reply</button>
                </div>
                <div class="flex items-start mt-4 gap-x-2">
                  <span
                    class="material-symbols-outlined text-purple-500 text-4xl"
                    >account_circle</span
                  >
                  <form class="flex flex-col gap-y-3 items-end w-full">
                    <input
                      type="text"
                      class="outline-none placeholder-purple-500 p-2 text-sm w-full text-purple-500 border-b-2 border-purple-500"
                      placeholder="Add a Comment...."
                    />
                    <button
                      type="submit"
                      class="bg-purple-300 text-purple-600 w-36 px-3 py-2 rounded-full"
                    >
                      Comment
                    </button>
                  </form>
                </div>
                <button class="flex mt-2 items-center text-sm text-blue-500">
                  <span class="material-symbols-outlined"
                    >keyboard_arrow_down</span
                  >
                  <span>50 replies</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col col-span-6 lg:col-span-2 items-start lg:items-center divide-y divide-purple-500 bg-purple-100 p-4 shadow-lg rounded-lg gap-y-3"
      >
        <router-link :to="`/video/${single.video_id}`" v-for="single in videos.another_videos" class="flex gap-x-3 relative" :key="single.id">
          <!-- <div v-if="single.video_id === videoId" class="absolute bg-purple-200 p-1">
            <span>Played</span>
          </div> -->
          <div v-if="single.video_id === videoId" class="now playing">
            <span class="bar n1">A</span>
            <span class="bar n2">B</span>
            <span class="bar n3">c</span>
            <span class="bar n4">D</span>
            <span class="bar n5">E</span>
            <span class="bar n6">F</span>
            <span class="bar n7">G</span>
            <span class="bar n8">H</span>
          </div>
          <img
            class="w-24 rounded-md h-16 object-cover"
            :src="`https://i.ytimg.com/vi/${single.video_id}/maxresdefault.jpg`"
            alt="img"
          />
          <p class="text-purple-600">
            {{ single.title }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { apiService } from '@/axios/apiService';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const videos = ref([]);
const videoId = ref(router.currentRoute.value.params.id);

const fetchData = async (video_id) => {
  try {
    const response = await apiService.get(`/videos/${video_id}`);
    if (response.data.status === 'success') {
      videos.value = response.data.data;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ path: '/' + videoId.value });
    } else if (error.response && error.response.status === 401) {
      authStore.removeUserWithToken();
      router.push({ path: '/login' });
    } else {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
  }
}

onMounted(() => {
  fetchData(videoId.value);
});

watch(
  () => router.currentRoute.value.params.id,
  (newId) => {
    videoId.value = newId;
    fetchData(newId);
  }
);

</script>


<style>
#iframe {
  height: 500px;
}

@media (max-width: 768px) {
  #iframe {
    height: 200px;
  }
}

.playing {
  position: absolute;
  top: 50%;
  width: auto;
}

.playing:after {
  content: "Now Playing";
  font-size: 15px;
  display: block;
  width: 100%;
}


.now.playing .bar {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  width: 7px;
  height: 3px;
  overflow: hidden;
  background: linear-gradient(to bottom, #ff9500, #ff5e3a);
  color: transparent;
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.paused.playing .bar {
  animation-iteration-count: 1;
}

.paused.playing:after {
  content: "Paused (Lame)"
}

.n1 {
  animation-delay: 0.5s;
}

.n2 {
  animation-delay: 0.2s;
}

.n3 {
  animation-delay: 1.2s;
}

.n4 {
  animation-delay: 0.9s;
}

.n5 {
  animation-delay: 2.3s;
}

.n6 {
  animation-delay: 1.3s;
}

.n7 {
  animation-delay: 3.1s;
}

.n8 {
  animation-delay: 1.9s;
}

@keyframes pulse {
  0% {
    height: 1px;
    margin-top: 0;
  }

  10% {
    height: 30px;
    margin-top: -40px;
  }

  50% {
    height: 10px;
    margin-top: -20px;
  }

  60% {
    height: 20px;
    margin-top: -30px;
  }

  80% {
    height: 50px;
    margin-top: -60px;
  }

  100% {
    height: 1px;
    margin-top: 0;
  }
}
</style>