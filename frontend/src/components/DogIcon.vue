<script setup lang="ts">
  interface Props {
    size?: number;
  }

  const { size = 32 } = defineProps<Props>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 443 443"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="dog-icon"
  >
    <defs>
      <linearGradient id="dogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #667eea; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #764ba2; stop-opacity: 1" />
      </linearGradient>
    </defs>

    <circle cx="220" cy="200" r="120" fill="url(#dogGradient)" opacity="0.9" />

    <path
      d="M132 7l21 13c-5 3-10 7-14 11c-22 19-38 47-42 78l-10 73l-22-13c-28-16-37-52-20-80l44-73c9-15 29-20 44-10z"
      fill="url(#dogGradient)"
      opacity="0.7"
    />

    <path
      d="M399 90c17 28 7 63-20 80l-22 13l-10-74c-5-37-26-69-55-88l21-13c15-10 35-5 44 10l42 72z"
      fill="url(#dogGradient)"
      opacity="0.7"
    />

    <circle cx="180" cy="167" r="18" fill="white" />
    <circle cx="180" cy="167" r="12" fill="#4a5568" />
    <circle cx="167" cy="161" r="6" fill="white" />

    <circle cx="262" cy="167" r="18" fill="white" />
    <circle cx="262" cy="167" r="12" fill="#4a5568" />
    <circle cx="275" cy="161" r="6" fill="white" />

    <path
      d="M236 200c17 0 28 18 19 33l-14 25c-9 15-31 15-40 0l-14-25c-9-15 2-33 19-33h30z"
      fill="#4a5568"
    />
    <circle cx="238" cy="215" r="6" fill="white" />

    <circle cx="136" cy="232" r="8" fill="url(#dogGradient)" opacity="0.6" />
    <circle cx="136" cy="264" r="8" fill="url(#dogGradient)" opacity="0.6" />
    <circle cx="160" cy="248" r="8" fill="url(#dogGradient)" opacity="0.6" />
    <circle cx="282" cy="248" r="8" fill="url(#dogGradient)" opacity="0.6" />
    <circle cx="306" cy="264" r="8" fill="url(#dogGradient)" opacity="0.6" />
    <circle cx="306" cy="232" r="8" fill="url(#dogGradient)" opacity="0.6" />
  </svg>
</template>

<style scoped>
  .dog-icon {
    transition: transform 0.3s ease;
  }

  .dog-icon:hover {
    transform: scale(1.1);
  }
</style>
