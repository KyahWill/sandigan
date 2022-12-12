<script lang="ts" setup>
  import neo4j from 'neo4j-driver'
  const client = useSupabaseClient()
  const file_source = ref("")
  
  const user = useSupabaseUser()
  const {data:user_details, error }= await client.auth.getUser()

  const is_liked = ref(false)  

  const route = useRoute();
  const route_id = route.params.id
  
  const like = async() => {
    const {data,error} = await client
                      .from("user_links")
                      .insert({
                        user_id: user_details.user.id,
                        juris_id: route_id, 
                      })
                      .select()
    is_liked.value = true
  }
  const unlike = async() => {
    try {await client
          .from("user_links")
          .delete()
          .match({
            user_id: user_details.user.id,
            juris_id: route_id, 
          })
    
    } finally {
      is_liked.value = false
    }
  }
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const driver = neo4j.driver(
    'neo4j+s://60318b06.databases.neo4j.io',
    neo4j.auth.basic('neo4j','Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8')
  ) 
  const session = driver.session() 
 
  onMounted( async() => { 
    if (user_details){
      console.log(user_details.user?.id)
      const {data}= await client.from("user_links")
                                  .select()
                                  .eq("user_id", user_details.user?.id)
                                  .eq("juris_id", route_id)
                                  .single()
      if(data) {
        is_liked.value = true
      }
    }
    try {
      const result =await session.executeRead(tx => {
        return tx.run(
          `MATCH (j :Juris {unique_id:`+ route_id+`})
          RETURN j.file_url AS url
          `,
        )
      })
       file_source.value = (result.records[0].get(0))
    } finally {
      await session.close()
    } 
    // on application exit:
    await driver.close() 
    const frame = document.getElementById("iframe")
      if(frame){
      frame.onload = () => {
        frame.style.height = frame.contentWindow.document.body.scrollHeight+'px'
      }
    }

  })


</script>

<template>
  <div class="flex flex-col w-5/6 mx-auto" >
    <div v-if="user" class="button">
      <button v-if="is_liked" @click="unlike">
        <p >Liked</p>
      </button>
      <button v-if="!is_liked" @click="like">
        <p >Like</p>
      </button>
    </div>
    
    <iframe
      id="iframe" 
      scrolling="no" 
      :src="'/'+file_source">
    </iframe>
  </div>
</template>

<style scoped>
  button {
    border-color:black;
    border-width:1px;
    border-radius: 5px;
    padding:2px;
  }
  iframe {
    overflow:hidden;
  }
</style>
