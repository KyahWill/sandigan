<script lang="ts" setup>

  const links = [
    {name:"Home",  link:"/"},
    {name:"About", link:"/browse"},
    {name:"Terms of Service", link:"/forum"},
    {name:"Privacy Policy", link:"/cases"},
  ]
</script>

<template>
  <footer>
    <p>
      Copyright © 2022 Sandigan. All Rights Reserved. 
    </p>
    <div class="spacer" style="width: 100px;"> 
    </div>
    <NuxtLink
      v-for="link in links" 
      :key="link.name"
      :to="link.link"
      class="links"
      style="text-decoration:none; margin-left: 30px;"
    >
      <p>
        {{ link.name }}
      </p>
    </NuxtLink>
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    flex-direction: row;
    width:100%;
    padding-left: 130px;
    background:#202020;
    position:fixed;
    bottom:0;
  }
  footer p {
    color:white;
  }
  .links p{
    color:white;
    text-decoration:none;
  }
</style>
