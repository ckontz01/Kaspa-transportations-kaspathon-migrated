import { useEffect, useRef } from 'react'

/**
 * Loads Leaflet from CDN if not yet available, then calls initFn to set up the map.
 * Returns a ref to attach to the map container div.
 */
export function useLeafletMap(initFn) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    const setup = () => {
      if (mapRef.current && !mapInstanceRef.current && window.L) {
        mapInstanceRef.current = initFn(mapRef.current)
      }
    }

    if (window.L) {
      setup()
    } else {
      const existing = document.querySelector('script[data-leaflet]')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.setAttribute('data-leaflet', 'true')
        script.onload = setup
        document.head.appendChild(script)
      } else {
        existing.addEventListener('load', setup)
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  // initFn is expected to be stable (defined outside render or via useCallback)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return mapRef
}
