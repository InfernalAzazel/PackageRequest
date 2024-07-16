<script lang="ts" setup>
const { data, pending, execute } = await useAsyncData(async () => {
  return await request('https://www.kokoni.ltd/index/Article/loadArticleInfo?article_id=123')
}, {immediate: false})

onMounted( async () =>{
  await execute()
})

</script>
<template>
  <div>
    <div> {{ data }}</div>
    222
  </div>
</template>
