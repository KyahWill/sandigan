<script setup>
  const filterText = ref("");
  const options = ["tests", "TEst123", "Sample", "double sample", "alphabet"]
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
        <select
          placeholder="Type here..."
        >
          <option v-for="option in options">
            {{ option }}
          </option>
        </select>
        <!-- 
          p v-for tags in selected tags
            add close button

         -->
      </div>
</template>
<style>

</style>