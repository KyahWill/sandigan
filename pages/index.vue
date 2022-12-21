<script lang="ts" setup>
import neo4j from "neo4j-driver";
import { Ref } from "vue";
import TableContent from "~/types/tables"

//Remove the capability of the user to see the credentials because this is a security issue
//Todo in the future
const client = useSupabaseClient();
const user = useSupabaseUser();
const { data: user_details, error } = await client.auth.getUser();

const driver = neo4j.driver(
  "neo4j+s://60318b06.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8")
);
const session = driver.session();
const recommendedData = ref([
  {
    title: "Loading cases",
    link: "/",
    tags: ["loading"],
  },
]);
const testData: TableContent ={
  title: "Loading cases",
  link: "/",
  tags: ["loading"],
  date: "1-1-1800"
}
const testTableData: Ref<Array<TableContent>> = ref([
  testData
]);

onServerPrefetch(async () => {
  // Load the List of Jurisprudence with limitations

  try {
    const { data } = await client
      .from("user_links")
      .select()
      .eq("user_id", user_details.user?.id);
    const dataset = data?.map((item) => {
      return parseInt(item['juris_id']);
    });
    await session.executeRead(async (tx) => {
      const queryJuris = await tx.run(
        `
          Match (Juris :Juris) 
          Return Juris 
          Order by Juris.year DESC, Juris.month DESC, Juris.day DESC
          Limit 5  
        `
      );
      const recommendedJuris = await tx.run(
        `
        match  (init :Juris) --> (n) <--(out :Juris)
        where init.unique_id in  [` +
          dataset?.toString() +
          `]
        return out 
        limit 5
        `
      );
      let tempValue = queryJuris.records.map((item) => {
        const Juris = item.get(0).properties;
        return {
          title: Juris.name,
          link: Juris.unique_id,
          tags: [""],
          date: Juris.month + "-" + Juris.day + "-" + Juris.year,
        };
      });
      const tempJuris = recommendedJuris.records.map((item) => {
        const Juris = item.get(0).properties;
        console.log(Juris.month + "-" + Juris.day + "-" + Juris.year);
        return {
          title: Juris.name,
          link: Juris.unique_id,
          tags: [""],
          date: Juris.month + "-" + Juris.day + "-" + Juris.year,
        };
      });

      testTableData.value = await Promise.all(
        tempValue.map(async (item) => {
          const tags_transaction = await tx.run(
            `
            Match (:Juris {unique_id:` +
              item.link +
              `}) -- (n) 
            Return n
            Limit 10  
          `
          );
          const queryTabs: Array<String> = tags_transaction.records.map((item) => {
            return item.get(0).properties.Title;
          });
          const tableContent: TableContent = {
            title: String(item.title),
            link: String(item.link),
            tags: [...queryTabs],
            date: String(item.date),
          }
          return tableContent
        })
      );
      recommendedData.value = await Promise.all(
        tempJuris.map(async (item) => {
          const tags_transaction = await tx.run(
            `
            Match (:Juris {unique_id:` +
              item.link +
              `}) -- (n) 
            Return n
            Limit 10  
          `
          );
          const queryTabs = tags_transaction.records.map((item) => {
            return item.get(0).properties.Title;
          });
          return {
            title: String(item.title),
            link: String(item.link),
            tags: [...queryTabs],
            date: String(item.date),
          };
        })
      );
    });
  } finally {
    await session.close();
    await driver.close();
  }
});
</script>

<template>
  <div class="homepage">
    <!-- <section class="featured_cases">
      <h2>
        Featured Cases
      </h2>
    </section> -->
    <section v-if="user" class="recommended_cases">
      <h2>Reccomended Cases</h2>
      <TableComponent :tableItem="recommendedData" />
    </section>
    <br />
    <br />
    <section class="new_cases">
      <h2>Recent Cases</h2>
      <TableComponent :tableItem="testTableData" />
    </section>
    <br />
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
  width: 80%;
}
h2 {
  font-weight: bold;
}
</style>
