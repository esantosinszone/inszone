import { writeFileSync } from 'node:fs'
const si = await import('simple-icons')
const want = [
  ['facebook', 'siFacebook', 'Facebook'],
  ['x', 'siX', 'X / Twitter'],
  ['instagram', 'siInstagram', 'Instagram'],
  ['linkedin', 'siLinkedin', 'LinkedIn'],
]
const out = want.map(([key, exp, label]) => {
  const icon = si[exp]
  if (!icon) throw new Error('falta ' + exp)
  return `  ${key}: {\n    label: '${label}',\n    path: '${icon.path}',\n  },`
})
const file = `/**
 * Official brand marks, as vector paths.
 *
 * These are solid single-path glyphs meant to be FILLED, not stroked — which
 * is why they don't go through \`Icon.astro\` (that renders the stroked
 * hugeicons set). Extracted once from simple-icons rather than kept as a
 * dependency: brand marks don't change, and it's four paths.
 *
 * The source files in public/images/social were PNGs wrapped in an SVG, so
 * they couldn't be recoloured; these can, via \`currentColor\`.
 */
export interface Brand {
  label: string
  path: string
}

/** All四 use a 24x24 viewBox. */
export const BRANDS = {
${out.join('\n')}
} as const

export type BrandName = keyof typeof BRANDS
`
writeFileSync('src/components/icons/brands.ts', file.replace('All四', 'All four'))
console.log('escrito. longitudes de path:')
want.forEach(([k, exp]) => console.log(' ', k, si[exp].path.length))
