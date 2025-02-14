<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/50 bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
      <slot name="header"></slot>

      <slot name="body"></slot>

      <slot name="footer"></slot>
    </div>
  </div>
</template>
