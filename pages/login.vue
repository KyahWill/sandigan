<script lang="ts" setup>
  const email = ref('')
  const password = ref('')
  
  const client = useSupabaseClient()

  const login = async () => {
    const {user, error} = await client.auth.signIn({
      email: email.value,
      password: password.value,
    }) 
  }
</script>

<template>
  <form>
    <input type="text" v-model="email"/>  
    <input type="password" v-model="password"/>
  </form>
</template>

<style scoped></style>
