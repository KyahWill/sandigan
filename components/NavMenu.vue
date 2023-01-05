<script lang="ts" setup>
const links = [
  { name: "Home", link: "/" },
  { name: "Browse", link: "/browse" },
];




const logout = async() => {
  // const {error }= await client.auth.signOut();
  // console.log(error)
}

const login = () => {
  navigateTo("/login")
}
const signup = () => {
  navigateTo("/signup")
}

</script>

<template>
  <header>
    <section class="bg-slate-900 h-8 flex flex-row px-40 text-white " style=" ">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        class="button"
        :href="link.link"
      >
        <h3 class="text-lg">{{ link.name }}</h3>
      </NuxtLink>
      <div v-if="user" class="align-right">
        <button type="button" class="align-right">
          <h3 @click="logout"> Log out </h3>
        </button>
        <NuxtLink
          class="button"
          href="/profile"
        >
          <h3 class="text-lg">Profile</h3>
        </NuxtLink>
      </div>
      <div v-else class="align-right">
        <button type="button" style="margin-right:20px;" class="align-right">
          <h3 @click="login"> Login </h3>
        </button>
        
        <button type="button" class="align-right">
          <h3 @click="signup"> Sign up </h3>
        </button>
      </div>
    </section>
    <HeaderSearch />
  </header>
</template>

<style scoped>

.align-right {
  margin-left:auto;
  display:flex;
  flex-direction:row;
}

.header h3 {
  font-family: "Inter", sans-serif;
}
</style>
