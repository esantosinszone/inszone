/**
 * The project's easing curve, in the two forms the codebase needs.
 *
 * CSS and the Web Animations API take the curve as a string; anything the site
 * animates by hand in a `requestAnimationFrame` loop (the stat counter) needs
 * it as a function. Both live here so the curve is defined once — it also
 * matches `--ease-app` / `--default-transition-timing-function` in global.css,
 * which is what every Tailwind `transition-*` utility resolves to.
 */

/** Control points of the curve: cubic-bezier(0.32, 0.72, 0, 1). */
const P1X = 0.32
const P1Y = 0.72
const P2X = 0
const P2Y = 1

/** For Web Animations and anywhere a CSS timing function is expected. */
export const EASE_APP = `cubic-bezier(${ P1X }, ${ P1Y }, ${ P2X }, ${ P2Y })`

/** One axis of the curve at parameter `t`, with P0 = 0 and P3 = 1. */
const bezier = ( t: number, p1: number, p2: number ): number => {
  const u = 1 - t
  return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t
}

const bezierSlope = ( t: number, p1: number, p2: number ): number => {
  const u = 1 - t
  return 3 * u * u * p1 + 6 * u * t * ( p2 - p1 ) + 3 * t * t * ( 1 - p2 )
}

/**
 * Numeric form of the curve: takes linear progress 0..1 and returns eased
 * progress. A CSS bezier is parameterised by `t`, not by x, so the x that
 * matches the given progress has to be solved for first — Newton-Raphson,
 * falling back to bisection on the flat stretches where the slope is too small
 * for Newton to converge.
 */
export const easeApp = ( progress: number ): number => {
  if ( progress <= 0 ) return 0
  if ( progress >= 1 ) return 1

  let t = progress
  for ( let i = 0; i < 8; i += 1 ) {
    const x = bezier( t, P1X, P2X ) - progress
    if ( Math.abs( x ) < 1e-5 ) return bezier( t, P1Y, P2Y )
    const slope = bezierSlope( t, P1X, P2X )
    if ( Math.abs( slope ) < 1e-6 ) break
    t -= x / slope
  }

  let low = 0
  let high = 1
  t = progress
  while ( high - low > 1e-5 ) {
    if ( bezier( t, P1X, P2X ) < progress ) low = t
    else high = t
    t = ( low + high ) / 2
  }
  return bezier( t, P1Y, P2Y )
}
