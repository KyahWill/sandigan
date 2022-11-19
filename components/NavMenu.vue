<script lang="ts" setup>  

  const links = [
    {name:"Home",  link:"/"},
    {name:"Browse", link:"/browse"},
    {name:"Forum", link:"/forum"},
    {name:"Cases", link:"/cases"},
  ]

  const searchItem = ref("testing")
  const submit = () => {
    console.log("Submitted")
  }
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
        <h3> {{ link.name }}</h3>
      </NuxtLink>
    </section>
    
    <section class="searchPage">
      <!-- Here is the search Icon and title-->
      <form>
        <img src="~/assets/images/SearchLogo.png" />
        <h3> 
          Sandigan
        </h3>
      <!-- Here is the search bar -->
        <input type="text" v-model="searchItem" />
      <!-- Here is the Search button -->
        <input type="submit" @click="submit"/>
      </form>
    </section>
  </header>
</template>

<style scoped>
  .header {    
    background : #202020;
    height: 100px;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 320px;
  }
  .searchPage form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: black;
  }
  
  .button {
    margin-left:20px;
    text-decoration:none;
  }
  .header h3 {
    color:white;
  }
</style>
