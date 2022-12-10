<script setup lang="ts">

interface TableContents {
  title: String;
  tags: [String];
  link: String;
}
const props = defineProps({
  tableItem: {
    type: Array<TableContents>,
    required: true,
  },
});
</script>

<template>
  <table>
    <tr
        v-for="(tableData, index) in props.tableItem" 
      :key="index"
    >
      <td>
        <NuxtLink :href="'browse/'+tableData.link"> {{ tableData.title}} </NuxtLink>
      </td>
      <td> {{ tableData.tags }} </td>
    </tr>
  </table>
</template>
<style scoped>
table,tr,td {
  border: 1px solid black;
  border-collapse: collapse;
}
td {
  text-decoration:none!important;
  color:black;
}
table {
  width: 100%;
}
</style>
