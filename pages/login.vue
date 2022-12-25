<script lang="ts" setup>
  const email = ref('')
  const password = ref('')
  const client = useSupabaseClient()
  const login = async (event:any) => {
    event.preventDefault()

    const {data, error} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if(data) { navigateTo("/") }
  }
</script>

<template>
  <form id="login">
    <section class="login_box">
      <div class="title">
        <h2>SANDIGAN</h2>
      </div>
      <br />
      <div class="login_form">
      <!-- How the fuck does this work? I will never know-->
      <p>Email Ad:        
        <input type="text" v-model="email"/>  
      </p>

      <br />
      <p>Password:  
        <input type="password" v-model="password"/>
      </p>
      <br />
      <button @click="login"> Login</button>
      </div>
    </section>
  </form>
</template>

<style scoped>
button {
  align-self:center;
}

.login_box{
  border: black;
  border-style: solid;
  height: 276px;
  width: 561px;
  border-radius: 0px;
}
#login {
  display:flex;
  justify-content:center;
}
.title {
  display:flex;
  justify-content:center;
}
.login_form {
  display:flex;
  justify-content:center;
  flex-direction:column;
}
</style>
