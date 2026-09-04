export interface Nav {
  label: string
  path: string
  active: boolean
  isScrollLink?: boolean
}

/**
 * An `.astro` component passed around as data (icons in the content files).
 * Astro has no public type for this, so we widen it here in one place rather
 * than sprinkling `any` through every data module.
 */
export type AstroComponent = ( props: Record<string, any> ) => any
