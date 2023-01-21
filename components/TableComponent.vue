<script setup lang="ts">
import TableContents from '~/types/tables'
const props = defineProps({
  tableItem: {
    type: Array<TableContents>,
    required: true
  }
})
</script>

<template>
  <div class="table">
    <div v-for="(tableData, index) in props.tableItem" id="row" :key="index">
      <section class="bg-white rounded-lg mb-2 p-3 border border-black">
        <NuxtLink :to="'/browse/' + tableData.link">
          {{ tableData.title }}
        </NuxtLink>
        <p style="font-size: small">
          {{ tableData.date }}
        </p>
        <hr>
        <div class="flex flex-row flex-wrap">
          <p
            v-for="(tag, tagIndex) in tableData.tags"
            :key="tagIndex"
            class="text-smaller bg-black text-white px-1 mt-2 mx-1"
          >
            {{ tag }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
</style>
