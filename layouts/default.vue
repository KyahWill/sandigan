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
    <amp-ad
      width="100vw"
      height="320"
      type="adsense"
      data-ad-client="ca-pub-3605390577343754"
      data-ad-slot="8387557644"
      data-auto-format="rspv"
      data-full-width=""
    >
      <div overflow="" />
    </amp-ad>
    <amp-ad
      width="100vw"
      height="320"
      type="adsense"
      data-ad-client="ca-pub-3605390577343754"
      data-ad-slot="8387557644"
      data-auto-format="rspv"
      data-full-width=""
    >
      <div overflow="" />
    </amp-ad>
    <Footer />
  </section>
</template>

<style scoped>

</style>
