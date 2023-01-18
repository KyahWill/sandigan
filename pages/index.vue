<script setup lang="ts">

import { Ref } from 'vue'
import TableContent from '~/types/tables'

// Remove the capability of the user to see the credentials because this is a security issue
// Todo in the future
// const client = useSupabaseClient();
// const user = useSupabaseUser();
// const { data: user_details, error } = await client.auth.getUser();
// const firebase_app = getFirebaseApp();
const page = ref(0)
const graphDriver = useDriver()

const recentJuris: Ref<Array<TableContent>> = useState('recommended', () => { return [] })

  const previous = () => {
  page.value--
}
const next = () => {
  page.value++
}
// onMounted( async()=> {
recentJuris.value = await useGraphQueryExperiment(graphDriver, queryLatestExperiment(page.value))
console.log(recentJuris.value)
// })

watch(page, async () => {
  recentJuris.value = await useGraphQueryExperiment(graphDriver, queryLatestExperiment(page.value))
})
// const query: String = queryLatest()
// const juris = useGraphQuery(graphDriver, query)
// recentJuris.value = await createTableContent(juris,graphDriver)

useHead({
  title: 'Sandigan: Philippine Legal Repository'
})
</script>

<template>
  <div class="flex justify-center flex-col ">
    <!-- <section class="featured_cases">
      <h2>
        Featured Cases
      </h2>
    </section> -->
    <!-- <section v-if="user" class="recommended_cases">
      <h2>Reccomended Cases</h2>
      <TableComponent :tableItem="recommendedData" />
    </section> -->
    <br>
    <br>
    <section class="w-9/12 mx-auto">
      <h2 class="text-xl">
        New Labor Case
      </h2>
      <TableComponent :table-item="recentJuris" />
      <div class="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul class="flex list-style-none">
            <li v-if="page > 0" class="page-item" @click="previous">
              <a
                class="page-link bg-white relative block py-1.5 px-3 rounded border text-lg border-black outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 focus:shadow-none"
                href="#"
              >
                Previous
              </a>
            </li>
            <li class="page-item" @click="next">
              <a
                class="page-link bg-white relative block py-1.5 px-3 rounded border text-lg border-black  outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <br>
  </div>
</template>

<style scoped>
</style>
