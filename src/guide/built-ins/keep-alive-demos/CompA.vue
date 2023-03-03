<script setup>
let count = $ref(0)
</script>

<template>
  <p>المكون الحالي: A</p>
  <span style="margin-right: 20px">العداد: {{ count }}</span>
  <button @click="count++">+</button>
</template>
