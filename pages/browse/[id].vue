<script lang="ts" setup>
  // const client = useSupabaseClient()
  const file_source = useState('jurisprudence', () =>{return ''})
  
  // const user = useSupabaseUser()
  // const {data:user_details, error }= await client.auth.getUser()

  // const is_liked = ref(false)  

  const route = useRoute();
  const route_id = route.params.id
  
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
  //Remove the capability of the user to see the credentials because this is a security issue
  //Todo in the future
  const graphDriver = useDriver()

 
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
    const query = queryNodeId(String(route_id))
    const test = await useGraphQuery(graphDriver, query)
    // console.log(query)
    // console.log(test)
    // const result =await session.executeRead(tx => {
      //   return tx.run(
      //     `MATCH (j :Juris {unique_id:`+ route_id+`})
      //     RETURN j.file_url AS url
      //     `,
      //   )
      // })Q
    file_source.value = (test[0].file_url)
    // on application exit:
    await graphDriver.close() 
    useHead({
  title:test[0].name,
})
  // })

</script>

<template>
  <div class="flex flex-col w-5/6 mx-auto" >
    <!-- <div v-if="user" class="button">
      <button v-if="is_liked" @click="unlike">
        <p >Liked</p>
      </button>
      <button v-if="!is_liked" @click="like">
        <p >Like</p>
      </button>
    </div> -->
    
    <embed
      id="iframe" 
      type="text/html"
      :src="'/'+file_source" />

  </div>
</template>

<style scoped>
  button {
    border-color:black;
    border-width:1px;
    border-radius: 5px;
    padding:2px;
  }
  #iframe {
    height:600px;
  }
</style>
