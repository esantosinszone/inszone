/**
 * Counts a number up from zero when it scrolls into view.
 *
 * The markup ships the FINAL value, so without JavaScript (or with
 * `prefers-reduced-motion`) the real figure is what's on screen. Zeroing only
 * happens once this script has decided it's going to animate.
 */

import { easeApp } from '@/scripts/easing'

const DURATION = 1800
const FORMATTER = new Intl.NumberFormat( 'en-US' )

let observer: IntersectionObserver | null = null

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches

const countUp = ( node: HTMLElement, target: number ): void => {
  const start = performance.now()

  const tick = ( now: number ): void => {
    const progress = Math.min( 1, ( now - start ) / DURATION )
    node.textContent = FORMATTER.format( Math.round( target * easeApp( progress )))
    if ( progress < 1 ) requestAnimationFrame( tick )
  }

  requestAnimationFrame( tick )
}

/**
 * Freeze the width at the final value before zeroing, so the row doesn't
 * reflow while the digits climb. Waits on the webfont because measuring
 * against the fallback face gives the wrong width.
 */
const reserveWidth = async ( node: HTMLElement ): Promise<void> => {
  try {
    await document.fonts?.ready
  } catch {
    // Font loading API unavailable — the measurement below is still close
    // enough to stop the row jumping.
  }
  node.style.display = 'inline-block'
  node.style.minWidth = `${ Math.ceil( node.getBoundingClientRect().width ) }px`
  node.textContent = '0'
}

export const initCounters = async (): Promise<void> => {
  observer?.disconnect()

  const nodes = Array.from( document.querySelectorAll<HTMLElement>( '[data-counter]' ))
  if ( !nodes.length || prefersReducedMotion() ) return

  await Promise.all( nodes.map( reserveWidth ))

  observer = new IntersectionObserver(
    ( entries ) => {
      entries.forEach(( entry ) => {
        if ( !entry.isIntersecting ) return
        const node = entry.target as HTMLElement
        observer?.unobserve( node )
        countUp( node, Number( node.dataset.counter ))
      })
    },
    { threshold: 0.4 }
  )

  nodes.forEach(( node ) => observer?.observe( node ))
}

export const destroyCounters = (): void => {
  observer?.disconnect()
  observer = null
}
