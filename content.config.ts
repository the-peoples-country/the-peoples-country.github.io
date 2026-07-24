import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      // `date` is a string, not z.date(): quote it in frontmatter so YAML does
      // not coerce it into a Date before validation runs.
      schema: z.object({
        description: z.string(),
        date: z.string(),
      }),
    }),
  },
})
