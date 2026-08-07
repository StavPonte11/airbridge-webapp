export type DocLink = {
  title: string
  slug: string
}

export type DocSection = {
  title: string
  items: DocLink[]
}

export const docsNav: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', slug: '/docs' },
      { title: 'Installation', slug: '/docs/installation' },
      { title: 'Quickstart', slug: '/docs/quickstart' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'The Bundle (.aib)', slug: '/docs/bundle' },
      { title: 'Architecture', slug: '/docs/architecture' },
      { title: 'The Import Pipeline', slug: '/docs/import-pipeline' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'CLI Reference', slug: '/docs/cli' },
      { title: 'Plugin SDK', slug: '/docs/plugins' },
      { title: 'Deployment', slug: '/docs/deployment' },
    ],
  },
]

export const flatDocs: DocLink[] = docsNav.flatMap((s) => s.items)

export function getAdjacent(slug: string) {
  const idx = flatDocs.findIndex((d) => d.slug === slug)
  return {
    prev: idx > 0 ? flatDocs[idx - 1] : null,
    next: idx >= 0 && idx < flatDocs.length - 1 ? flatDocs[idx + 1] : null,
  }
}
