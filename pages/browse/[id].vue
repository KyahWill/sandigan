<script lang="ts" setup>
// const client = useSupabaseClient()
import axios from 'axios'
import { Ref } from 'vue'
import TableContent from '~~/types/tables'

const app = getFirebaseApp()
const storage = getStorages(app)
const graphDriver = useDriver()

const file_source = useState('jurisprudence', () => { return '' })
const cases_cited: Ref<Array<TableContent>> = useState('cases', () => { return [] })

const route = useRoute()
const route_id = route.params.id

const query = queryNodeId(String(route_id))
const citation_query = queryCitedCases(String(route_id))
const jurisprudence = await useGraphQuery(graphDriver, query)
const cited_jurisprudence = await useGraphQueryExperiment(graphDriver, citation_query)

cases_cited.value = cited_jurisprudence
file_source.value = await getFile(storage, jurisprudence[0].file_url)

const data: string = (await axios.get(file_source.value)).data
const myregex = /^[\s\S]*<body>([\s\S]*)<\/body>[\s\S]*$/igm
const match = myregex.exec(data)
const output = match![1]
await graphDriver.close()
useHead({
  title: jurisprudence[0].name
})
// const user = useSupabaseUser()
// const {data:user_details, error }= await client.auth.getUser()

// const is_liked = ref(false)

// const like = async() => {
//   await client
//     .from("user_links")
//     .insert({
//       user_id: user_details.user.id,
//       juris_id: route_id,
//     })
//     .select()
//   is_liked.value = true
// }
// const unlike = async() => {
//   try {await client
//         .from("user_links")
//         .delete()
//         .match({
//           user_id: user_details.user.id,
//           juris_id: route_id,
//         })

//   } finally {
//     is_liked.value = false
//   }
// }
// Remove the capability of the user to see the credentials because this is a security issue
// Todo in the future

// console.log(query)
// console.log(jurisprudence)
// const result =await session.executeRead(tx => {
//   return tx.run(
//     `MATCH (j :Juris {unique_id:`+ route_id+`})
//     RETURN j.file_url AS url
//     `,
//   )
// })Q

// })
// onServerPrefetch(async() => {
// if (user_details){
//   console.log(user_details.user?.id)
//   const {data}= await client.from("user_links")
//                               .select()
//                               .eq("user_id", user_details.user?.id)
//                               .eq("juris_id", route_id)
//                               .single()
//   if(data) {
//     is_liked.value = true
//   }
// }
</script>

<template>
  <div class="flex flex-row">
    <!-- <div v-if="user" class="button">
      <button v-if="is_liked" @click="unlike">
        <p >Liked</p>
      </button>
      <button v-if="!is_liked" @click="like">
        <p >Like</p>
      </button>
    </div> -->
    <div
      id="juris_cases"
      class="mx-auto w-3/4 bg-white p-3 border border-black rounded-xl"
      v-html="output"
    />
    <br>
    <div class=" ml-5 w-96">
      <div class="mt-4">
        <p class="text-xl">
          Cases that cited this:
        </p>
      </div>
      <TableComponent :table-item="cases_cited" />
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        data-ad-client="ca-pub-3605390577343754"
        data-ad-slot="2119029745"
        data-auto-format="rspv"
        data-full-width=""
      >
        <div overflow="" />
      </amp-ad>
    </div>
  </div>
</template>

<style scoped>
  button {
    border-color:black;
    border-width:1px;
    border-radius: 5px;
    padding:2px;
  }

</style>
