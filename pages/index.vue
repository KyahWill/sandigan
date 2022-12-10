<script lang="ts" setup>
  import neo4j from 'neo4j-driver'
  
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 
  const testTableData = ref([
    {
      title: "Test Title",
      link: "/",
      tags: ["Test title"],
    },
    {
      title: "Test Title",
      link: "/",
      tags: ["Test title"],
    },
    {
      title: "Test Title",
      link: "/",
      tags: ["Test title"],
    }
  ])
  
  const isAuthenticated = ref(true)
  onMounted( async() => { 
    // Load the List of Jurisprudence with limitations
    try {
      const value = await session.executeRead(async (tx) => {
        const juris_transaction = await tx.run(
        `
        Match (Juris :Juris) 
          Return Juris 
          Limit 10
        `
        )
        let temp_value = juris_transaction.records.map((item) => {
          const Juris = item.get(0).properties
          console.log(Juris.name)
          return{
            title: Juris.name,
            link:Juris.unique_id,
            tags: [''],
          }
        })
        testTableData.value = await Promise.all(temp_value.map(async(item) => {
          const tags_transaction = await tx.run(
            `
            Match (:Juris {name:"`+item.title+`"}) -- (n) 
            Return n
            Limit 10
          `
          )
          const queryTabs = tags_transaction.records.map((item) => {
            return item.get(0).properties.Title
          })
          console.log(queryTabs)
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
  <div class="homepage">
    <section class="featured_cases">
      <h2>
        Featured Cases
      </h2>
    </section>
    <section class="new_cases">
      <h2>
        Recent Cases
      </h2>
      <TableComponent :tableItem="testTableData"/> 
    </section>
    <section 
      v-if="isAuthenticated"
      class="recommended_cases"
    >
      <h2>
        Reccomended Cases
      </h2>
      <TableComponent :tableItem="testTableData"/>
    </section>
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
</style>
