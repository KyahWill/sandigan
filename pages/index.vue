<script setup lang="ts">

import { Ref } from "vue"
import TableContent from "~/types/tables"

//Remove the capability of the user to see the credentials because this is a security issue
//Todo in the future
// const client = useSupabaseClient();
// const user = useSupabaseUser();
// const { data: user_details, error } = await client.auth.getUser();
const firebase_app = getFirebaseApp();

console.log(firebase_app)
const graphDriver = useDriver()
const recentJuris: Ref<Array<TableContent>> = useState( "recommended", () => { return []});

// onMounted( async()=> {
  recentJuris.value =  await useGraphQueryExperiment(graphDriver,queryLatestExperiment())
// })

// const query: String = queryLatest()
// const juris = useGraphQuery(graphDriver, query)
// recentJuris.value = await createTableContent(juris,graphDriver)

useHead({
  title:"Sandigan: Philippine Legal Repository",
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
    <br />
    <br />
    <section class="w-9/12 mx-auto" >
      <h2 class="text-xl">New Labor Case</h2>
      <TableComponent :tableItem="recentJuris" />
    </section>
    <br />
  </div>
</template>

<style scoped>
</style>
