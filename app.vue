<script lang="ts" setup>
import type {ResponseMessages} from "~/services/typings";

const { data, pending, execute } = await useAPI<ResponseMessages<any>>('https://www.kokoni.ltd/index/Article/loadArticleInfo?article_id=123')

onMounted( async () =>{
  await execute()
})

</script>
<template>
  <div>
    <div> {{ data.data }}</div>
    222
  </div>
</template>
