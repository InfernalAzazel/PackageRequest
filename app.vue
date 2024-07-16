<script lang="ts" setup>
const { data, pending, execute } = await useTestRequest({immediate: true,ssr: true})

// onMounted( async () =>{
//   await execute()
// })

</script>
<template>
  <div>
    <div> {{ data }}</div>
    222
  </div>
</template>
