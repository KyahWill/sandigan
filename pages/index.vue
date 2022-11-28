<script lang="ts" setup>
  import neo4j from 'neo4j-driver'
  
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 
  
  const isAuthenticated = ref(true)
  onMounted( async() => { 
    try {
      const result =await session.executeRead(tx => {
        return tx.run(
          `MATCH (p:Person)
          RETURN p.name AS name
          LIMIT 10`,
        )
      })
      console.log(result)

    } finally {
      await session.close()
    } 

    // on application exit:
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
    <section class="new_cases">
      <h2>
        Recent Cases
      </h2>
      <TableComponent /> 
    </section>
    <section 
      v-if="isAuthenticated"
      class="recommended_cases"
    >
      <h2>
        Reccomended Cases
      </h2>
      <TableComponent />
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
