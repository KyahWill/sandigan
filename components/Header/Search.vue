<script setup lang="ts">
const searchItem = ref('');
const submit = () => {
  const search = searchItem.value.replaceAll(" ","+")
  navigateTo("/browse?search="+search)
};
</script>
<template>

<section class="flex flex-row px-40 ">
      <!-- Here is the search Icon and title-->
      <form class="flex flex-row items-center text-black w-full" @submit.prevent="submit">
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
            v-model="searchItem"
            placeholder="Find Legal Materials for your needs"
            required
          />
          <input
          type="submit"
          value="Search"
          class="text-white absolute right-2.5 bottom-2.5 bg-neutral-700 hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
        </div>
        <!-- Here is the Search button -->
      </form>
    </section>
</template>