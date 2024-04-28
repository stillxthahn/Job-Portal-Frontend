import { useEffect, useRef, useState } from "react"

export function useSticky<Target extends HTMLElement>(root?: string) {
	const ref = useRef<Target>(null)
	const [isSticky, setIsSticky] = useState(false)

	useEffect(() => {
		if (!ref.current) {
			return
		}
		console.log(document.querySelector(`.${root}`))
		const observer = new IntersectionObserver(([event]) => 
			setIsSticky(event.intersectionRatio < 1),
		{root: document.querySelector(`.${root}`) || null , threshold: [1], rootMargin: '-1px 0px 0px 0px',}
		)
		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])
	return {ref, isSticky}
} 