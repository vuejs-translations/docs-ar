<script setup>
import { ref } from 'vue'
const msg = ref('')
</script>

<template>
  <p>المكون الحالي: B</p>
  <span style="margin-right: 20px">الرسالة: {{ msg }}</span>
  <input v-model="msg">
</template>
