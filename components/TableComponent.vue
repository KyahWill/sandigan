<script setup lang="ts">
import TableContents from "~/types/tables";
const props = defineProps({
  tableItem: {
    type: Array<TableContents>,
    required: true,
  },
});
</script>

<template>
  <div class="table">
    <div v-for="(tableData, index) in props.tableItem" id="row" :key="index">
      <section>
        <NuxtLink :href="'browse/' + tableData.link">
          {{ tableData.title }}
        </NuxtLink>
        <p style="font-size: small">
          {{ tableData.date }}
        </p>
        <hr />
        <div class="flex flex-row flex-wrap">
          <p
            v-for="(tag, tagIndex) in tableData.tags"
            :key="tagIndex"
            class="tags mt-2"
          >
            {{ tag }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
section {
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: black;
  border-collapse: collapse;
}
.tags {
  font-size: smaller;
  background: black;
  color: white;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
  width: fit-content;
  height: fit-content;
}
</style>
