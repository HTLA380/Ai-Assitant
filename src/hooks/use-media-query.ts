"use client"

import { useEffect, useState } from "react"

export default function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)

    const listener = () => setMatches(!!mediaQueryList.matches)

    listener()

    mediaQueryList.addEventListener("change", listener)

    return () => mediaQueryList.removeEventListener("change", listener)
  }, [mediaQueryString])

  return matches
}
