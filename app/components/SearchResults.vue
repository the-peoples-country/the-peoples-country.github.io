<script setup lang="ts">
import type { SearchSection } from '~/composables/useSiteSearch'

const props = defineProps<{
  results: SearchSection[]
  pending?: boolean
}>()

function snippet(text: string) {
  return text.length > 180 ? `${text.slice(0, 180).trimEnd()}…` : text
}
</script>

<template>
  <p v-if="props.pending && !props.results.length" class="muted">
    Searching…
  </p>

  <p v-else-if="!props.results.length" class="muted">
    No results.
  </p>

  <ol v-else class="results">
    <li v-for="hit in props.results" :key="hit.id">
      <NuxtLink :to="hit.id">
        <span v-if="hit.titles.length" class="crumb">
          {{ hit.titles.join(' › ') }} ›
        </span>
        {{ hit.title }}
      </NuxtLink>
      <p class="muted">{{ snippet(hit.content) }}</p>
    </li>
  </ol>
</template>
