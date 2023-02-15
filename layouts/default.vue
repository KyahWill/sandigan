<script lang="ts" setup>

</script>

<template>
  <section>
    <div class="bg-gray-200 min-h-screen ">
      <NavMenu />
      <div class="w-11/12 mx-auto">
        <slot />
      </div>
      <div class="h-16" />
    </div>
    <Footer />
  </section>
</template>

<style scoped>

</style>
