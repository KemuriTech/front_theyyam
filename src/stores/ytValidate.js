import { defineStore } from 'pinia';
export const useYTValidate = defineStore('ytValidate',
  () => {
    const ytList = ref([]);

    const getYTVideo = computed(() => ytList);
    const addYTVideo = ytVideo => {
      ytList.value.push( ytVideo );
    }

    const validateYTVideo = async uID => {
      const { $ytVideo } = useNuxtApp();
      const index = ytList.value?.findIndex(list => list.uid === uID);
      if (index === -1) {
        return await $ytVideo
          .isYTVideoValid(uID)
          .then(dim => {
            const ytVideo = {
              uid: uID,
              isValid: false,
            };
            if ($ytVideo.checkThumbnail(dim.width)) {
              ytVideo.isValid = true;
            }
            addYTVideo(ytVideo);
            return ytVideo;
          })
      } else {
        return ytList.value[index];
      }
    }

    return { ytList, getYTVideo, validateYTVideo }
  })