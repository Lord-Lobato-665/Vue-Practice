<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink class="text-3x1 font-bold hover:text-blue-500" to="/">Home</RouterLink>
        <RouterLink class="text-3x1 font-bold hover:text-blue-500" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

</template>
