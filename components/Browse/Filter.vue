<script setup>

</script>
<template>
      <div class="category_filters">
        <h2>Filters here:</h2>  

        <label for="search"> Type the name of a country to search </label>
        <input
          id="search"
          v-model="filterText"
          type="text"
          placeholder="Type here..."
        />
      
      </div>
</template>
<style>
.category_filters {
  border-width: 1px;
  border-radius: 20px;
  width: 300px;
  min-height: 400px;
  margin-right: 20px;
  padding-left: 20px;
  padding-left: 20px;
  padding-top: 5px;
  height: fit-content;
}


</style>