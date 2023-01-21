<!-- eslint-disable import/no-named-as-default-member -->
<script lang="ts" setup>
import { Ref } from 'vue'
import TableContent from '~/types/tables'

const route = useRoute()
const routeName = ref('')
onMounted(async () => {
  routeName.value = String(route.query.search)
  const query = (route.query.search) ? querySearch(String(routeName.value).toUpperCase()) : queryLatestExperiment(0)
  tableData.value = await useGraphQueryExperiment(graphDriver, query)
})

watch(route, async (newRoute) => {
  const query = (newRoute.query.search) ? querySearch(String(newRoute.query.search).toUpperCase()) : queryLatestExperiment(0)
  tableData.value = await useGraphQueryExperiment(graphDriver, query)
  // recentJuris.value =  await useGraphQueryExperiment(graphDriver,queryLatestExperiment(newRouteName))
})
const graphDriver = useDriver()
const tableData: Ref<Array<TableContent>> = useState('tableData', () => [])

// console.log(query)
// const juris = useGraphQuery(graphDriver, query)
// tableData.value = await createTableContent(juris,graphDriver)

// console.log(tableData.value)
useHead({
  title: 'Browse Jurisprudence'
})

</script>

<template>
  <div class="homepage">
    <!-- <section class="featured_cases">
      <strong> Featured Cases </strong>
    </section>
    <br /><br /> -->
    <section class="browse_cases">
      <BrowseFilter :graph-driver="graphDriver" />

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
