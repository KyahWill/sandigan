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
      <td class="tags"> 
        <p v-for="(tag, index) in tableData.tags" :key="index">{{tag}}</p>
      </td>
    </tr>
  </table>
</template>
<style scoped>
tr{
  border: 1px solid black;
  border-collapse: collapse;
}
p {
  background: black;
  color: white;
  border-radius:20px;
  padding:5px;
  margin: 5px;
  width:fit-content;
  height: fit-content;
}
.tags { 
  flex:1;
  display:flex;
  flex-flow: row wrap;
}
td {
  text-decoration:none!important;
  color:black;
}
table {
  width: 100%;
}
</style>
