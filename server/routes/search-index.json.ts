// Prerendered to `.output/public/search-index.json` at build time.
//
// The `.json` extension in the route path is load-bearing: Nitro writes a
// prerendered non-HTML route to disk verbatim, so an extensionless route would
// land as an extensionless file and break content-type inference on a static host.
export default defineEventHandler(async (event) => {
  return await queryCollectionSearchSections(event, 'blog')
})
