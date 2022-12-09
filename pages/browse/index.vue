<script lang="ts" setup>
  import neo4j, { ResultSummary } from 'neo4j-driver'  
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
      tags: "Test title",
    },
    {
      title: "Test Title",
      link: "/",
      tags: "Test title",
    },
    {
      title: "Test Title",
      link: "/",
      tags: "Test title",
    }
  ])
  onMounted( async() => { 
    // Load the List of Jurisprudence with limitations
    try {
      const result =await session.executeRead(tx => {
        return tx.run(
        `
        Match (Juris) 
          Return Juris 
          Limit 10
          `
        )
      })
      testTableData.value = result.records.map((item)=> {
        return{
          title: item.get(0),
          link:'/',
          tags: item.get(0)
        }

      })
    } finally {
      await session.close()
    } 
    await driver.close() 
  })

</script>

<template>
  <div class="homepage">
    <section class="featured_cases">
      <h2>
        Featured Cases
      </h2>
    </section>
    <section class="browse_cases">
      <div class="catetory_filters">
        <h2> 
          Insert Filters here:
        </h2>
      </div>
      <div class="table_list">
        <h2>
          Recent Cases
        </h2>
      
        <TableComponent :tableItem="testTableData"/> 
      </div>
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
  .browse_cases {
    display:flex;
    flex-direction:row;
  }
  .table_list {
    flex-grow:1;
  }
</style>
