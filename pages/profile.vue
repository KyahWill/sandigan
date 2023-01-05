<script lang="ts" setup>
import {Ref} from 'vue'
import TableContent from "~/types/tables"
definePageMeta({
  middleware: ["auth"],
});
//Remove the capability of the user to see the credentials because this is a security issue
//Todo in the future
// const user = useSupabaseUser();
// const client = useSupabaseClient();
// const { data: user_details, error } = await client.auth.getUser();

// const driver = useDriver()
// const session = driver.session();
const testData: TableContent = {
  title:"Loading",
  tags:["loading"],
  date:"",
  link:"",
} 
const testTableData: Ref<Array<TableContent>> = ref([testData]);

// onMounted(async () => {
//   // Load the List of Jurisprudence with limitations
//   const { data } = await client
//     .from("user_links")
//     .select()
//     .eq("user_id", user_details.user?.id);
//   console.log(data);
//   try {
//     const value = await session.executeRead(async (tx) => {
//       const liked_juris = await Promise.all(
//         data.map(async (item) => {
//           console.log(item.juris_id);
//           const juris = await tx.run(
//             `
//               Match (Juris :Juris {unique_id:` +
//               item.juris_id +
//               `})
//               Return Juris
//             `
//           );
//           console.log("Juris", juris);
//           const table_records = juris.records.at(0)?.get(0).properties;
//           return {
//             title: table_records.name,
//             link: table_records.unique_id,
//             tags: [""],
//             date: table_records.month + "-"+table_records.day + "-"+ table_records.year
//           };
//         })
//       );

//       console.log(liked_juris);

//       testTableData.value = await Promise.all(
//         liked_juris.map(async (item) => {
//           const tags_transaction = await tx.run(
//             `
//             Match (:Juris {unique_id:` +
//               item.link +
//               `}) -- (n) 
//             Return n
//             Limit 10  
//           `
//           );
//           const queryTabs = tags_transaction.records.map((item) => {
//             return item.get(0).properties.Title;
//           });
//           return {
//             title: String(item.title),
//             link: String(item.link),
//             tags: [...queryTabs],
//             date: String(item.date)
//           };
//         })
//       );
//     });
//   } finally {
//     await session.close();
//     await driver.close();
//   }
// });
</script>

<template>
  <div class="w-5/6 mx-auto">
    <h3>Liked Cases</h3>
    <TableComponent :tableItem="testTableData" />
  </div>
</template>

<style scoped></style>
