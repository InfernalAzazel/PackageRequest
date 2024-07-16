<script lang="ts" setup>
const { data, pending, execute } = await useTestRequest()

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
