import { ReactNode, useEffect, useState } from 'react'

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

export function Button({ children, onClick }: ButtonProps) {
    const [isPressing, setIsPressing] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsPressing(false)
        }, 250)

        return () => clearTimeout(timeout)
    }, [isPressing])

    return (
        <button
            className="Button"
            onClick={() => {
                setIsPressing(true)
                onClick()
            }}
            style={isPressing ? { opacity: 0.8 } : {}}
        >
            {children}
        </button>
    )
}
