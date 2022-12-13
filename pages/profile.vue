<script lang="ts" setup>

  import neo4j from 'neo4j-driver'

  definePageMeta({
  middleware:['auth'],
  })
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const {data:user_details, error }= await client.auth.getUser()

  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 
  const testTableData = ref([
    {
      title: "Loading cases",
      link: "/",
      tags: ["loading"],
    },
  ])

  onMounted( async() => { 
    // Load the List of Jurisprudence with limitations
    const {data}= await client.from("user_links")
                                  .select()
                                  .eq("user_id", user_details.user?.id)
    console.log(data)                                                  
    try {
      const value = await session.executeRead(async (tx) => {
        
        const liked_juris = await Promise.all(data.map(async(item ) => {
          console.log(item.juris_id)
          const juris = await tx.run(
            `
              Match (Juris :Juris {unique_id:`+item.juris_id+`})
              Return Juris
            `
          )
          console.log("Juris", juris)
          const table_records = juris.records.at(0)?.get(0).properties
          return {
            title: table_records.name,
            link: table_records.unique_id,
            tags: [''],
          }
        })) 


        console.log(liked_juris)
        
        testTableData.value = await Promise.all(liked_juris.map(async(item) => {
          const tags_transaction = await tx.run(
            `
            Match (:Juris {unique_id:`+item.link+`}) -- (n) 
            Return n
            Limit 10  
          `
          )
          const queryTabs = tags_transaction.records.map((item) => {
            return item.get(0).properties.Title
          })
          return{
            title: String(item.title),
            link: String(item.link),
            tags: [...queryTabs],
          }
        })
        )
      })

    } finally {
    await session.close()
    await driver.close() 
    }
  })




</script>

<template>
  <div class="w-5/6 mx-auto">
    <h3>Liked Cases</h3>
    <TableComponent :tableItem="testTableData"/>
  </div>
</template>

<style scoped></style>
