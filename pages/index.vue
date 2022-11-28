<script lang="ts" setup>
  import neo4j from 'neo4j-driver'
  
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  )
  const session = driver.session()
  const personName = 'Alice'
 
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
      const node = singleRecord.get(0)

      console.log(node.properties.name)
    } finally {
      await session.close()
    } 

    // on application exit:
    await driver.close() 
  })
</script>

<template>
  <section class="homepage">
    <div class="grid">
      <div class="featured_cases">
        <h2>
          Featured Cases
        </h2>
      </div>
      <div class="calendar">
        <h2> Calendar Test </h2>

      </div>
      <div class="new_cases">
        <h2> New Cases Test </h2>
      </div>
      <div class="reccomendations">
        <h2> Reccomendations test </h2>
      </div>
    </div>

  </section>
</template>

<style scoped>
  .homepage {
    display:flex;
    justify-content:center;
  }
  .grid {
    display:grid;
    grid-template-columns: 975px 270px;
    column-gap:24px;
    row-gap:24px;
  }
</style>
