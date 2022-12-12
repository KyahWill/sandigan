<script lang="ts" setup>
const links = [
  { name: "Home", link: "/" },
  { name: "Browse", link: "/browse" },
];
const client = useSupabaseClient()
const user = useSupabaseUser()

const searchItem = ref("testing");
const submit = () => {
  console.log(searchItem);
};
const logout = async() => {
  const {error }= await client.auth.signOut();
  console.log(error)
}

const login = () => {
  navigateTo("/login")
}
const signup = () => {
  navigateTo("/signup")
}
onMounted(async() => {
  // getSession()
})
</script>

<template>
  <header>
    <section class="header">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        class="button"
        :href="link.link"
      >
        <h3 class="text-lg">{{ link.name }}</h3>
      </NuxtLink>
      <div v-if="user" class="align-right">
        <button type="button"  class="align-right">
          <h3 @click="logout"> Log out </h3>
        </button>
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

    <section class="searchPage">
      <!-- Here is the search Icon and title-->
      <form class="w-full">
        <img src="~/assets/images/SearchLogo.png" style="width:82;height:90" />
        <h3 class="text-5xl">Sandigan</h3>
        <!-- Here is the search bar -->
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            id="default-search"
            type="text"
            class="block w-full p-4 pl-9 text-sm 
                  text-gray-900 border border-gray-300 
                  rounded-lg bg-gray-50 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500" 
            placeholder="Search for Cases" 
            required
          />
          <button 
          @click="submit"
          type="button" 
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        <!-- Here is the Search button -->
      </form>
    </section>
  </header>
</template>

<style scoped>
.header {
  background: #202020;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-left: 320px;
  padding-right: 320px;
}
.align-right {
  margin-left:auto;
}
.searchPage {
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin:auto;
}
.searchPage form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: black;
}
.button {
  margin-left: 20px;
  text-decoration: none;
}
.header h3 {
  color: white;
  font-family: "Inter", sans-serif;
}
</style>
