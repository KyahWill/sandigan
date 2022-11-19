<script lang="ts" setup></script>

<template>
  <section class="homepage">
    <div class="grid">
      <div class="featured_cases">
        <h2>
          Featured Cases
        </h2>
      </div>
      <div class="calendar">
        <h2> Calendar Test </h2>

      </div>
      <div class="new_cases">
        <h2> New Cases Test </h2>
      </div>
      <div class="reccomendations">
        <h2> Reccomendations test </h2>
      </div>
    </div>

  </section>
</template>

<style scoped>
  .homepage {
    display:flex;
    justify-content:center;
  }
  .grid {
    display:grid;
    grid-template-columns: 975px 270px;
    column-gap:24px;
    row-gap:24px;
  }
</style>
