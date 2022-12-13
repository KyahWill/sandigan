<script lang="ts" setup>
  import neo4j from 'neo4j-driver'
  
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const user = useSupabaseUser()
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 const recommendedData = ref([
    {
      title: "Loading cases",
      link: "/",
      tags: ["loading"],
    },
 ])
  const testTableData = ref([
    {
      title: "Loading cases",
      link: "/",
      tags: ["loading"],
    },
  ])
  onMounted( async() => { 
    // Load the List of Jurisprudence with limitations
    try {
      const value = await session.executeRead(async (tx) => {
        const juris_transaction = await tx.run(
        `
          Match (Juris :Juris) 
          Return Juris 
          Order by Juris.year DESC, Juris.month DESC, Juris.day DESC
          Limit 10
        `
        )
        const recommended_juris = await tx.run(
        `
          Match (Juris :Juris) 
          Return Juris 
          Order by rand()
          Limit 10
        `
        )
        let temp_value = juris_transaction.records.map((item) => {
          const Juris = item.get(0).properties
          return{
            title: Juris.name,
            link:Juris.unique_id,
            tags: [''],
          }
        })
        const temp_juris = recommended_juris.records.map((item) => {
          const Juris = item.get(0).properties
          return{
            title: Juris.name,
            link:Juris.unique_id,
            tags: [''],
          }
        })
        testTableData.value = await Promise.all(temp_value.map(async(item) => {
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
        }))
        recommendedData.value = await Promise.all(temp_juris.map(async(item) => {
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
        }))
      })

    } finally {
    await session.close()
    await driver.close() 
    }
  })

</script>

<template>
  <div class="homepage">
    <!-- <section class="featured_cases">
      <h2>
        Featured Cases
      </h2>
    </section> -->
    <section 
      v-if="user"
      class="recommended_cases"
    >
      <h2>
        Reccomended Cases
      </h2>
      <TableComponent :tableItem="recommendedData"/>
    </section>
    <br />
    <br />
    <section class="new_cases">
      <h2>
        Recent Cases
      </h2>
      <TableComponent :tableItem="testTableData"/> 
    </section>
    <br />
  </div>
</template>

<style scoped>
  .homepage {
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
  }
  .homepage section{
    width:80%;
  }
  h2 {
    font-weight:bold;
  }
</style>
