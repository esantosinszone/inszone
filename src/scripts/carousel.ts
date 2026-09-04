/**
 * Wires arrows, bullets and optional autoplay onto the native scroll-snap
 * tracks rendered by `Carousel.astro`. The track scrolls on its own without
 * this — everything here is progressive enhancement, so a failed hydration
 * degrades to a plain swipeable row.
 */

const ACTIVE_DOT = [ 'w-[34px]', 'bg-primary-500' ]
const IDLE_DOT = [ 'w-2.5', 'bg-primary-200', 'hover:bg-primary-400' ]

interface Pagination {
  perPage: number
  pages: number
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches

const setDotState = ( dot: HTMLElement, active: boolean ): void => {
  dot.classList.remove( ...( active ? IDLE_DOT : ACTIVE_DOT ))
  dot.classList.add( ...( active ? ACTIVE_DOT : IDLE_DOT ))
  dot.setAttribute( 'aria-selected', String( active ))
}

/** Cleanup for everything `bindTrack` attaches, so re-init doesn't stack timers. */
let teardown: ( () => void )[] = []

const bindTrack = ( track: HTMLElement ): void => {
  const id = track.dataset.carouselTrack
  if ( !id || track.dataset.carouselBound ) return

  const root = track.closest<HTMLElement>( `[data-carousel-id="${ id }"]` )
  if ( !root ) return

  const slides = Array.from( track.children ) as HTMLElement[]
  if ( !slides.length ) return

  track.dataset.carouselBound = '1'

  const prev = root.querySelector<HTMLButtonElement>( `[data-carousel-prev="${ id }"]` )
  const next = root.querySelector<HTMLButtonElement>( `[data-carousel-next="${ id }"]` )
  const dots = Array.from(
    root.querySelectorAll<HTMLButtonElement>( `[data-carousel-bullets="${ id }"] [data-index]` )
  )

  const isScrollable = (): boolean => track.scrollWidth - track.clientWidth > 1
  const isAtEnd = (): boolean =>
    isScrollable() && track.scrollLeft >= track.scrollWidth - track.clientWidth - 1

  const paginate = (): Pagination => {
    const slideWidth = slides[ 0 ].offsetWidth
    const step = slides[ 1 ] ? slides[ 1 ].offsetLeft - slides[ 0 ].offsetLeft : slideWidth
    const perPage = Math.max( 1, Math.floor(( track.clientWidth + step - slideWidth ) / step ))
    return { perPage, pages: isScrollable() ? Math.ceil( slides.length / perPage ) : 1 }
  }

  const currentPage = ( pagination: Pagination ): number => {
    if ( isAtEnd() ) return pagination.pages - 1
    let closest = 0
    let smallest = Infinity
    slides.forEach(( slide, index ) => {
      const distance = Math.abs( slide.offsetLeft - track.scrollLeft )
      if ( distance < smallest ) {
        smallest = distance
        closest = index
      }
    })
    return Math.floor( closest / pagination.perPage )
  }

  const goToPage = ( page: number ): void => {
    const { perPage, pages } = paginate()
    const clamped = Math.max( 0, Math.min( pages - 1, page ))
    const target = slides[ Math.min( slides.length - 1, clamped * perPage ) ]
    track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }

  const sync = (): void => {
    const pagination = paginate()
    const active = currentPage( pagination )
    dots.forEach(( dot, index ) => {
      dot.hidden = index >= pagination.pages
      setDotState( dot, index === active )
    })
    if ( prev ) prev.disabled = !isScrollable() || track.scrollLeft <= 1
    if ( next ) next.disabled = !isScrollable() || isAtEnd()
  }

  // ── Autoplay ──────────────────────────────────────────────────────────────
  // Opt-in per carousel. Pauses on hover and on keyboard focus, and while the
  // tab is in the background — an unattended timer scrolling a hidden page just
  // burns frames. Manual navigation restarts the clock instead of stopping it,
  // so a click doesn't leave the user waiting on a half-elapsed interval.
  const delay = Number( root.dataset.carouselAutoplay ?? 0 )
  const autoplays = delay > 0 && !prefersReducedMotion()
  let timer: number | null = null

  const stopAutoplay = (): void => {
    if ( timer !== null ) {
      window.clearInterval( timer )
      timer = null
    }
  }

  const startAutoplay = (): void => {
    if ( !autoplays ) return
    stopAutoplay()
    timer = window.setInterval(() => {
      if ( !isScrollable() ) return
      const pagination = paginate()
      const upcoming = currentPage( pagination ) + 1
      goToPage( upcoming >= pagination.pages ? 0 : upcoming )
    }, delay )
  }

  const restartAutoplay = (): void => {
    if ( !autoplays ) return
    startAutoplay()
  }

  const onPrev = (): void => {
    goToPage( currentPage( paginate() ) - 1 )
    restartAutoplay()
  }
  const onNext = (): void => {
    goToPage( currentPage( paginate() ) + 1 )
    restartAutoplay()
  }

  prev?.addEventListener( 'click', onPrev )
  next?.addEventListener( 'click', onNext )

  const dotHandlers = dots.map(( dot, index ) => {
    const handler = (): void => {
      goToPage( index )
      restartAutoplay()
    }
    dot.addEventListener( 'click', handler )
    return { dot, handler }
  })

  track.addEventListener( 'scroll', sync, { passive: true })
  const observer = new ResizeObserver( sync )
  observer.observe( track )

  const onVisibility = (): void => ( document.hidden ? stopAutoplay() : startAutoplay() )

  if ( autoplays ) {
    root.addEventListener( 'mouseenter', stopAutoplay )
    root.addEventListener( 'mouseleave', startAutoplay )
    root.addEventListener( 'focusin', stopAutoplay )
    root.addEventListener( 'focusout', startAutoplay )
    document.addEventListener( 'visibilitychange', onVisibility )
    startAutoplay()
  }

  teardown.push(() => {
    stopAutoplay()
    observer.disconnect()
    track.removeEventListener( 'scroll', sync )
    prev?.removeEventListener( 'click', onPrev )
    next?.removeEventListener( 'click', onNext )
    dotHandlers.forEach(({ dot, handler }) => dot.removeEventListener( 'click', handler ))
    root.removeEventListener( 'mouseenter', stopAutoplay )
    root.removeEventListener( 'mouseleave', startAutoplay )
    root.removeEventListener( 'focusin', stopAutoplay )
    root.removeEventListener( 'focusout', startAutoplay )
    document.removeEventListener( 'visibilitychange', onVisibility )
    delete track.dataset.carouselBound
  })

  sync()
}

export const initCarousels = (): void => {
  destroyCarousels()
  document.querySelectorAll<HTMLElement>( '[data-carousel-track]' ).forEach( bindTrack )
}

export const destroyCarousels = (): void => {
  teardown.forEach(( fn ) => fn())
  teardown = []
}
