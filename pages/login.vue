<script lang="ts" setup>
  const email = ref('')
  const password = ref('')
  
  const client = useSupabaseClient()

  const login = async (event:any) => {
    event.preventDefault()
    console.log(client.auth)
    const {user, error} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    }) 
    console.log(user)
    console.log(error)
  }
</script>

<template>
  <form id="login">
    <section class="login_box">
      <div class="title">
        <h2>SANDIGAN</h2>
      </div>
      <input type="text" v-model="email"/>  
      <br />
      <input type="password" v-model="password"/>
      <br />
      <button @click="login"> </button>
      
    </section>
  </form>
</template>

<style scoped>

#login {
  display:flex;
  justify-content:center;
}
.title {
  display:flex;
  justify-content:center;

}
</style>
