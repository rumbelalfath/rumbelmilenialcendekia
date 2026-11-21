/** Serve a file from /public/img through the Netlify Image CDN, resized and as WebP. */
export function cdnImg(file: string, width: number) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=78`
}
