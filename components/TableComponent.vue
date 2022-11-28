<script setup lang="ts">
const props = defineProps({
  tableItem: {
    type: [],
    required:true,
    default:["test","test","Test"]
  }
})

</script>

<template>
  <table>
    <tr 
      v-for="(tableData, index) in props.tableItem" 
      :key="index"
    >
      <td> Test data</td>
      <td> Another Test Data </td>
    </tr>
  </table>
</template>
<style scoped>
  table, tr, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  table {
  width: 100%;
}
</style>
