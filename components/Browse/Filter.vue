<script setup>
import { Driver } from 'neo4j-driver-core'

const filterText = ref('')
const props = defineProps({
  graphDriver: {
    type: Driver,
    required: true
  }
})

const query = queryLegalTerms()
const options = await useGraphQuery(props.graphDriver, query)
</script>
<template>
  <div
    class="border border-black rounded-lg
        bg-white
        w-80
        h-96
        p-2
        mr-5"
  >
    <h2>Filters:</h2>
    <!-- insert autocomplete here -->
    <label>Tags</label>
    <select
      v-model="filterText"
      placeholder="Type here..."
    >
      <option v-for="(option, index) in options" :key="index">
        {{ option.title }}
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
