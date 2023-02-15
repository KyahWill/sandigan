<script lang="ts" setup>
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  getAuth
} from 'firebase/auth'

const firebaseui = await import('firebaseui')

const email = ref('')
const password = ref('')
// const client = useSupabaseClient()
const login = (event:any) => {
  event.preventDefault()
  // const {data, error} = await client.auth.signInWithPassword({
  //   email: email.value,
  //   password: password.value,
  // })
  // if(data) { navigateTo("/") }
}
const uiConfig = {
  signInSuccessUrl: '/success',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID
  ]
}

const ui = new firebaseui.auth.AuthUI(getAuth())
ui.start('#firebaseui-auth-container', uiConfig)
</script>

<template>
  <form id="login">
    <section class="login_box">
      <div class="title">
        <h2>SANDIGAN</h2>
      </div>
      <br>
      <div class="login_form">
        <!-- How the fuck does this work? I will never know-->
        <p>
          Email Ad:
          <input v-model="email" type="text">
        </p>

        <br>
        <p>
          Password:
          <input v-model="password" type="password">
        </p>
        <br>
        <button @click="login">
          Login
        </button>
      </div>
      <div id="firebaseui-auth-container" />
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
