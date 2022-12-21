<!-- eslint-disable import/no-named-as-default-member -->
<script lang="ts" setup>

import neo4j from "neo4j-driver";
import { Ref } from "vue";
import TableContent from "~/types/tables";
// Remove the capability of the user to see the credentials because this is a security issue
// Todo in the future
const filterText = ref("");
const route = useRoute();
const routeName = String(route.query.search);

const neo4jDriver = neo4j.driver(
  "neo4j+s://60318b06.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8")
);
const session = neo4jDriver.session();
const testData: TableContent = {
  title:"Loading",
  tags:["loading"],
  date:"",
  link:"",
}
const query = ref('')
const testTableData: Ref<Array<TableContent>> = ref([testData]);
async () => {
  // Load the List of Jurisprudence with limitations
  try {
    await session.executeRead(async (tx: any) => {
      // the query used in jurisTransaction relies on 
      // whether there is a routeName or not
      if (routeName){
        query.value = `
            Match (Juris :Juris )
            WHERE Juris.name CONTAINS "` +
            routeName.replaceAll("+", " ") +
            `" 
            Return Juris 
            Order by Juris.year, Juris.month, Juris.day
            Limit 10
          `
      }else {
        query.value = `
            Match (Juris :Juris) 
            Return Juris 
            Order by rand()
            Limit 10
          `
      }
      console.log(query.value)
      const jurisTransaction = await tx.run(query.value);
      const temporaryValue = jurisTransaction.records.map((item: any) => {
        const Juris = item.get(0).properties;
        return {
          title: Juris.name,
          link: Juris.unique_id,
          tags: [""],
          date: Juris.month + "-" + Juris.day + "-" + Juris.year,
        };
      });
      testTableData.value = await Promise.all(
        temporaryValue.map(async (item: TableContent) => {
          const tagQuery = await tx.run(
            `
            Match (:Juris {unique_id:` +
              item.link +
              `}) -- (n) 
            Return n
            Limit 10
          `
          );
          const queryTabs = tagQuery.records.map((item: any) => {
            return item.get(0).properties.Title;
          });
          const information: TableContent = {
            title: item.title,
            link: item.link,
            tags: queryTabs,
            date: item.date,
          } 
          return information
        })
      );
    });
  } finally {
    await session.close();
    await neo4jDriver.close();
  }
};
</script>

<template>
  <div class="homepage">
    <section class="featured_cases">
      <strong> Featured Cases </strong>
    </section>
    <br /><br />
    <section class="browse_cases">
      <div class="category_filters">
        <h2>Filters here:</h2>  

        <label for="search"> Type the name of a country to search </label>
        <input
          id="search"
          v-model="filterText"
          type="text"
          placeholder="Type here..."
        />
      
      </div>
      <div class="table_list">
        <h2>Recent Cases</h2>

        <TableComponent :table-item="testTableData" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.homepage section {
  width: 90%;
}
.browse_cases {
  display: flex;
  flex-direction: row;
}
.category_filters {
  border-width: 1px;
  border-radius: 20px;
  width: 300px;
  min-height: 400px;
  margin-right: 20px;
  padding-left: 20px;
  padding-top: 5px;
  height: fit-content;
}

.table_list {
  flex-grow: 1;
}
</style>
