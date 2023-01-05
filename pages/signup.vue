<script lang="ts" setup>
  const email = ref('')
  const password = ref('')
  // const client = useSupabaseClient()
  // const signup = async (event:any) => {
  //   event.preventDefault()
  //   console.log(client.auth)
  //   const {data, error} = await client.auth.signUp({
  //     email: email.value,
  //     password: password.value,
  //   })
  //   console.log(data)
  //   console.log(error)
  //   if(data) {
  //     navigateTo("/")
  //   }
  // }
</script>

<template>
  <form id="signup">
    <section class="signup_box">
      <div class="title">
        <h2>SANDIGAN</h2>
      </div>
      <br />
      <div class="signup_form">
      <!-- How the fuck does this work? I will never know-->
      <p>Email Ad:        
        <input type="text" v-model="email"/>  
      </p>

      <br />
      <p>Password:  
        <input type="password" v-model="password"/>
      </p>
      <br />
      <button @click="signup"> signup</button>
      </div>
    </section>
  </form>
</template>

<style scoped>
button {
  align-self:center;
}

.signup_box{
  border: black;
  border-style: solid;
  height: 276px;
  width: 561px;
  border-radius: 0px;
}
#signup {
  display:flex;
  justify-content:center;
}
.title {
  display:flex;
  justify-content:center;
}
.signup_form {
  display:flex;
  justify-content:center;
  flex-direction:column;
}
</style>
