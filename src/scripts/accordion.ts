/**
 * Animated, optionally exclusive disclosure built on `<details>`.
 *
 * `<details>` gives us the semantics, keyboard handling and screen-reader
 * behaviour for free, but the browser toggles its content with `display`, so
 * there is nothing to transition. This intercepts the toggle and animates the
 * element's own height instead, then hands control back to the native `open`
 * state once the animation lands.
 *
 * Without JavaScript every panel still opens and closes — it just snaps, and
 * more than one can be open at a time. That's the graceful degradation, which
 * is why the exclusivity isn't done with the native `name` attribute: `name`
 * would slam the sibling shut instantly and skip the close animation.
 */

import { EASE_APP } from '@/scripts/easing'

const DURATION = 320

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches

class Accordion {
  private readonly details: HTMLDetailsElement
  private readonly summary: HTMLElement
  private readonly content: HTMLElement
  private animation: Animation | null = null
  private isClosing = false
  private isExpanding = false

  constructor( details: HTMLDetailsElement ) {
    this.details = details
    this.summary = details.querySelector( 'summary' ) as HTMLElement
    this.content = details.querySelector( '[data-accordion-content]' ) as HTMLElement

    this.summary.addEventListener( 'click', ( event ) => this.onClick( event ))
  }

  public get group(): string | undefined {
    return this.details.dataset.accordionGroup
  }

  public get isOpen(): boolean {
    return this.details.open && !this.isClosing
  }

  /** Collapse from the outside — used when a sibling in the group opens. */
  public close(): void {
    if ( !this.details.open || this.isClosing ) return
    this.shrink()
  }

  private onClick( event: MouseEvent ): void {
    event.preventDefault()

    if ( prefersReducedMotion() ) {
      this.details.open = !this.details.open
      if ( this.details.open ) this.closeSiblings()
      return
    }

    // `overflow` is restored when the animation settles; without it the content
    // spills out of the shrinking box.
    this.details.style.overflow = 'hidden'

    if ( this.isClosing || !this.details.open ) {
      this.expandFromCollapsed()
      this.closeSiblings()
    } else {
      this.shrink()
    }
  }

  private closeSiblings(): void {
    if ( !this.group ) return
    registry.forEach(( instance ) => {
      if ( instance !== this && instance.group === this.group ) instance.close()
    })
  }

  private shrink(): void {
    this.isClosing = true
    this.details.style.overflow = 'hidden'
    this.animate( `${ this.details.offsetHeight }px`, `${ this.summary.offsetHeight }px`, false )
  }

  /** Open the element first so the content has a measurable height, then animate to it. */
  private expandFromCollapsed(): void {
    this.details.style.height = `${ this.details.offsetHeight }px`
    this.details.open = true
    requestAnimationFrame(() => {
      this.isExpanding = true
      this.animate(
        `${ this.details.offsetHeight }px`,
        `${ this.summary.offsetHeight + this.content.offsetHeight }px`,
        true
      )
    })
  }

  private animate( from: string, to: string, open: boolean ): void {
    this.animation?.cancel()
    this.animation = this.details.animate({ height: [ from, to ] }, { duration: DURATION, easing: EASE_APP })
    this.animation.onfinish = () => this.settle( open )
    this.animation.oncancel = () => {
      this.isClosing = false
      this.isExpanding = false
    }
  }

  private settle( open: boolean ): void {
    this.details.open = open
    this.animation = null
    this.isClosing = false
    this.isExpanding = false
    this.details.style.height = ''
    this.details.style.overflow = ''
  }
}

let registry: Accordion[] = []

export const initAccordions = (): void => {
  registry = Array.from(
    document.querySelectorAll<HTMLDetailsElement>( 'details[data-accordion]' )
  ).map(( details ) => new Accordion( details ))
}
