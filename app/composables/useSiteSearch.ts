import type MiniSearch from 'minisearch'

/** One indexed section, as emitted by `queryCollectionSearchSections`. */
export type SearchSection = {
  /** Post path plus heading anchor, e.g. `/blog/hello-world#background`. */
  id: string
  title: string
  /** Ancestor headings, page title first. Empty for a page-level section. */
  titles: string[]
  level: number
  content: string
}

// Module-scoped so the index is fetched and built at most once per page load,
// no matter how many components call the composable.
let index_promise: Promise<MiniSearch<SearchSection>> | null = null

function load_index() {
  if (!index_promise) {
    index_promise = (async () => {
      // MiniSearch is dynamically imported so it stays out of the initial bundle
      // and is only fetched once someone actually searches.
      const [{ default: MiniSearchConstructor }, sections] = await Promise.all([
        import('minisearch'),
        $fetch<SearchSection[]>('/search-index.json'),
      ])

      const instance = new MiniSearchConstructor<SearchSection>({
        fields: ['title', 'content'],
        storeFields: ['id', 'title', 'titles', 'content'],
      })
      instance.addAll(sections)
      return instance
    })()
  }
  return index_promise
}

export function useSiteSearch(query: Ref<string>) {
  const results = ref<SearchSection[]>([])
  const pending = ref(false)

  // Client-only: never construct an index during prerendering.
  if (import.meta.client) {
    watch(query, async (value) => {
      const trimmed = value.trim()
      if (!trimmed) {
        results.value = []
        pending.value = false
        return
      }

      pending.value = true
      const instance = await load_index()

      // A later keystroke may have landed while the index was loading.
      if (query.value.trim() !== trimmed) return

      results.value = instance.search(trimmed, {
        prefix: true,
        fuzzy: 0.2,
        boost: { title: 2 },
      }) as unknown as SearchSection[]
      pending.value = false
    }, { immediate: true })
  }

  return { results, pending }
}
