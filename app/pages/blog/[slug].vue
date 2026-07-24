<script setup lang="ts">
const route = useRoute()
const path = `/blog/${route.params.slug as string}`

const { data: post } = await useAsyncData(`blog:${path}`, () =>
  queryCollection('blog').path(path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <time :datetime="post.date" class="muted">{{ post.date }}</time>
    <ContentRenderer :value="post" />
  </article>
</template>
