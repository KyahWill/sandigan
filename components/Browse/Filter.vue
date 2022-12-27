<script setup>
  const filterText = ref("");
  
</script>
<template>
      <div class="border border-black rounded-lg
                 bg-white 
                 w-80 
                 h-96 
                 p-2
                 mr-5">
        <h2>Filters:</h2>  
        <!-- insert autocomplete here -->
        <label>Tags</label>
        <input
          id="search"
          v-model="filterText"
          type="text"
          placeholder="Type here..."
        />
        <!-- 
          p v-for tags in selected tags
            add close button

         -->
      </div>
</template>
<style>

</style>