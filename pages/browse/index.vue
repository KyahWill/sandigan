<!-- eslint-disable import/no-named-as-default-member -->
<script lang="ts" setup>
import { Ref } from "vue";
import TableContent from "~/types/tables";

const filterText = ref("");
const route = useRoute();
const routeName = route.query.search;

const graphDriver = useDriver()

const tableData: Ref<Array<TableContent>> = useState('tableData',() =>[]);
onServerPrefetch(async() => {

  const query = (routeName)?  querySearch(String(routeName)): queryLatest()
  const juris = useGraphQuery(graphDriver, query)
  tableData.value = await Promise.all(
    (await juris).map(async(item) => {
      const tags = (await useGraphQuery(graphDriver, queryTags(item.unique_id)))
        .map((tag) => {return tag.Title})
      return {
        title: item.name,
        link: item.link,
        tags: tags,
        date: item.date
      }
    })
  )
});
</script>

<template>
  <div class="homepage">
    <section class="featured_cases">
      <strong> Featured Cases </strong>
    </section>
    <br /><br />
    <section class="browse_cases">
      <BrowseFilter />

      <div class="table_list">
        <h2>Recent Cases</h2>

        <TableComponent :table-item="tableData" />
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
.table_list {
  flex-grow: 1;
}
</style>
