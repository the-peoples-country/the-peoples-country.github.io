<script setup lang="ts">
const query = ref('')
const { results, pending } = useSiteSearch(query)

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

const filtering = computed(() => query.value.trim().length > 0)

useSeoMeta({
  title: "The People's Country",
  description: 'Writing from The People’s Country.',
})
</script>

<template>
  <div>
    <input
      v-model="query"
      type="search"
      placeholder="Search posts…"
      aria-label="Search posts"
    >

    <SearchResults v-if="filtering" :results="results" :pending="pending" />

    <ol v-else class="posts">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        <p class="muted">{{ post.description }}</p>
        <time :datetime="post.date" class="muted">{{ post.date }}</time>
      </li>
    </ol>
  </div>
</template>
