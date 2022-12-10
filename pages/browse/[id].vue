<script lang="ts" setup>
import neo4j from 'neo4j-driver'
  
  const route = useRoute();
  const route_id = route.params.id
  const file_source = ref("")
 
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 
  onMounted( async() => { 
    try {
      const result =await session.executeRead(tx => {
        return tx.run(
          `MATCH (j :Juris {unique_id:`+ route_id+`})
          RETURN j.file_url AS url
          LIMIT 10`,
        )
      })
       file_source.value = (result.records[0].get(0))
       console.log(file_source)
    } finally {
      await session.close()
    } 
    // on application exit:
    await driver.close() 
  })


</script>

<template>
  <div>
    <iframe width="1000px" height="800px" :src="'/'+file_source"></iframe>
  </div>
</template>

<style scoped>
  iframe {
    width:90%,
  }
</style>
