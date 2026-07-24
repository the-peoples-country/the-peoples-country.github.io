<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// Starts empty so the prerendered HTML and the first client render agree —
// query params do not exist at build time.
const query = ref('')
const { results, pending } = useSiteSearch(query)

// Read the URL by *watching* it, not by reading it once on mount. On a
// prerendered page the client router resolves the real URL (including `?q=`)
// one tick after mount, so an `onMounted` read still sees the build-time route.
// Watching also keeps back/forward navigation working.
watch(() => route.query.q, (value) => {
  const next = typeof value === 'string' ? value : ''
  if (next !== query.value) query.value = next
}, { immediate: true })

// Mirror typing back into the URL so results stay shareable. The equality guard
// keeps this from ping-ponging with the watcher above.
watch(query, (value) => {
  const trimmed = value.trim()
  const current = typeof route.query.q === 'string' ? route.query.q : ''
  if (trimmed === current) return
  router.replace({ query: trimmed ? { q: trimmed } : {} })
})

useSeoMeta({ title: "Search — The People's Country" })
</script>

<template>
  <div>
    <h1>Search</h1>

    <input
      v-model="query"
      type="search"
      placeholder="Search posts…"
      aria-label="Search posts"
    >

    <SearchResults
      v-if="query.trim()"
      :results="results"
      :pending="pending"
    />
    <p v-else class="muted">
      Type to search. Results link straight to the relevant section.
    </p>
  </div>
</template>
