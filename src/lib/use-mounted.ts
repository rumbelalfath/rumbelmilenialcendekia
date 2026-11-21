import { useEffect, useState } from 'react'

/** Games shuffle with Math.random, so they render only after hydration to avoid SSR mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
