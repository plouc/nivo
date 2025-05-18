import { useRef, useState, useCallback, useEffect } from 'react'

export function useCopyToClipboard(timeout = 1500): [boolean, (text: string) => Promise<void>] {
    const [isCopied, setCopied] = useState(false)
    const isMounted = useRef(true)
    const timer = useRef<number>()

    useEffect(() => {
        return () => {
            isMounted.current = false
            if (timer.current) clearTimeout(timer.current)
        }
    }, [])

    const copy = useCallback(
        async (text: string) => {
            try {
                await navigator.clipboard.writeText(text)
                if (!isMounted.current) return

                setCopied(true)
                timer.current = window.setTimeout(() => {
                    if (isMounted.current) setCopied(false)
                }, timeout)
            } catch {
                // swallow error
            }
        },
        [timeout]
    )

    return [isCopied, copy]
}
