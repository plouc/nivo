import {
    useState,
    KeyboardEvent,
    ReactNode,
    useCallback,
    useRef,
    useEffect,
    FunctionComponent,
    Fragment,
    PropsWithChildren,
    forwardRef,
    Ref,
    useImperativeHandle,
    createRef,
} from 'react'
import { animated, useTransition } from '@react-spring/web'
import { FaArrowUp, FaArrowDown, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { FaRegKeyboard } from 'react-icons/fa6'
import { BiTargetLock } from 'react-icons/bi'
import styled from 'styled-components'

type KeySize = 'medium' | 'large'

const KeyContainer = styled.span<{ size: KeySize }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #849297;
    color: #212b2e;
    height: ${({ size }) => (size === 'medium' ? 22 : 28)}px;
    border-radius: 4px;
    background-color: white;
    box-shadow:
        0 2px 0 -1px #cbd6d8,
        0 2px 0 #849297;
    font-size: ${({ size }) => (size === 'medium' ? 9 : 11)}px;
    text-transform: uppercase;
    font-weight: 800;
    padding: 0 ${({ size }) => (size === 'medium' ? 6 : 9)}px;
    box-sizing: border-box;
`
const IconKeyContainer = styled(KeyContainer)<{ size: KeySize }>`
    color: #374347;
    width: ${({ size }) => (size === 'medium' ? 22 : 28)}px;
    padding: 0;
    font-size: ${({ size }) => (size === 'medium' ? 13 : 15)}px;
    font-weight: normal;
`

interface KeyProps {
    size?: KeySize
}

export const KeyArrowUp = ({ size = 'medium' }: KeyProps) => (
    <IconKeyContainer size={size}>
        <FaArrowUp />
    </IconKeyContainer>
)
export const KeyArrowDown = ({ size = 'medium' }: KeyProps) => (
    <IconKeyContainer size={size}>
        <FaArrowDown />
    </IconKeyContainer>
)
export const KeyArrowRight = ({ size = 'medium' }: KeyProps) => (
    <IconKeyContainer size={size}>
        <FaArrowRight />
    </IconKeyContainer>
)
export const KeyArrowLeft = ({ size = 'medium' }: KeyProps) => (
    <IconKeyContainer size={size}>
        <FaArrowLeft />
    </IconKeyContainer>
)
export const KeyEnter = ({ size = 'medium' }: KeyProps) => (
    <KeyContainer size={size}>ENTER</KeyContainer>
)
export const KeySpace = ({ size = 'medium' }: KeyProps) => (
    <KeyContainer size={size}>Space</KeyContainer>
)
export const KeyEscape = ({ size = 'medium' }: KeyProps) => (
    <KeyContainer size={size}>ESC</KeyContainer>
)

export const KEY_COMPONENTS: Record<string, FunctionComponent<KeyProps>> = {
    ArrowUp: KeyArrowUp,
    ArrowDown: KeyArrowDown,
    ArrowRight: KeyArrowRight,
    ArrowLeft: KeyArrowLeft,
    Enter: KeyEnter,
    ' ': KeySpace,
    Escape: KeyEscape,
}

export const Key = ({ children, size = 'medium' }: KeyProps & { children: string }) => {
    const KeyComponent = KEY_COMPONENTS[children]

    if (KeyComponent) {
        return <KeyComponent size={size} />
    }

    return <KeyContainer size={size}>{children}</KeyContainer>
}

interface KeyLogEntry {
    id: number
    type: 'key'
    key: string
    label?: string
}
interface FocusLogEntry {
    id: number
    type: 'focus'
    label: string
}

type LogEntry = KeyLogEntry | FocusLogEntry

interface KeyLoggerHandle {
    logKey: (event: KeyboardEvent, label?: string) => void
    logFocus: (label: string) => void
}

export const useKeyLoggerRef = () => {
    return createRef<KeyLoggerHandle>()
}

interface KeyLoggerProps {
    only?: string[]
    duration?: number
    maxEntries?: number | undefined
}

export const KeyLogger = forwardRef(
    ({ only, duration = 4000, maxEntries = 6 }: KeyLoggerProps, ref: Ref<KeyLoggerHandle>) => {
        const [entries, setEntries] = useState<LogEntry[]>([])
        const nextId = useRef(0)
        const timers = useRef<number[]>([])

        const logKey = useCallback(
            (event: KeyboardEvent, label?: string) => {
                if (only && !only.includes(event.key)) return

                const id = nextId.current++
                const entry: KeyLogEntry = { id, type: 'key', key: event.key, label }
                setEntries(prev => {
                    const updated = [entry, ...prev]
                    return typeof maxEntries === 'number' ? updated.slice(0, maxEntries) : updated
                })

                const clearTimer = window.setTimeout(() => {
                    setEntries(prev => prev.filter(keyEntry => keyEntry.id !== id))
                    timers.current = timers.current.filter(t => t !== clearTimer)
                }, duration)
                timers.current.push(clearTimer)
            },
            [duration, only, maxEntries]
        )

        const logFocus = useCallback(
            (label: string) => {
                const id = nextId.current++
                const entry: FocusLogEntry = { id, type: 'focus', label }
                setEntries(prev => {
                    const updated = [entry, ...prev]
                    return typeof maxEntries === 'number' ? updated.slice(0, maxEntries) : updated
                })

                const clearTimer = window.setTimeout(() => {
                    setEntries(prev => prev.filter(x => x.id !== id))
                    timers.current = timers.current.filter(t => t !== clearTimer)
                }, duration)
                timers.current.push(clearTimer)
            },
            [duration, maxEntries]
        )

        useImperativeHandle(
            ref,
            () => ({
                logKey,
                logFocus,
            }),
            [logKey, logFocus]
        )

        useEffect(() => {
            return () => {
                timers.current.forEach(clearTimeout)
                timers.current = []
            }
        }, [])

        const transitions = useTransition(entries, {
            keys: item => item.id,
            from: { opacity: 1, scale: 1.5 },
            enter: { opacity: 1, scale: 1 },
            leave: { opacity: 0, scale: 1 },
            config: { duration: 300 },
        })

        return (
            <LogsContainer>
                {transitions((style, entry) => {
                    if (entry.type === 'focus') {
                        return (
                            <Focus key={entry.id} style={{ opacity: style.opacity }}>
                                <FocusIcon>
                                    <BiTargetLock />
                                </FocusIcon>
                                <span>{entry.label}</span>
                            </Focus>
                        )
                    }

                    return (
                        <LogEntryContainer
                            key={entry.id}
                            style={{
                                opacity: style.opacity,
                                transform: style.scale.to(s => `scale(${s})`),
                            }}
                        >
                            <Key>{entry.key}</Key>
                            {entry.label && <div>{entry.label}</div>}
                        </LogEntryContainer>
                    )
                })}
            </LogsContainer>
        )
    }
)

const LogsContainer = styled.div`
    height: 28px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    min-width: 160px;
    margin-bottom: 12px;
`

const Focus = styled(animated.div)`
    grid-column-start: 1;
    grid-column-end: 3;
    height: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    border: 1px solid #2d75e8;
    box-sizing: border-box;
    padding-right: 9px;
    font-weight: 600;
    margin-bottom: 4px;
    font-size: 11px;

    &:not(:first-child) {
        margin-left: 6px;
    }
`

const FocusIcon = styled.span`
    width: 22px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
    color: #2d75e8;
`

const LogEntryContainer = styled(animated.div)`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 22px;
    margin-bottom: 4px;

    &:not(:first-child) {
        margin-left: 6px;
    }

    & > div {
        margin-right: 6px;
        box-sizing: border-box;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 2px;
        border: 1px solid #9aa6aa;
        padding: 0 6px;
        font-size: 11px;
        font-weight: 600;
    }
`

interface KeyboardDocProps {
    keys: {
        key: string
        description: ReactNode
    }[]
}

export const KeyboardDoc = ({ keys, children }: PropsWithChildren<KeyboardDocProps>) => {
    return (
        <div>
            <KeyboardDocTitle>
                <span>Keyboard Navigation</span>
                <FaRegKeyboard />
            </KeyboardDocTitle>
            <KeyboardDocKeys>
                {keys.map(key => (
                    <Fragment key={key.key}>
                        <Key>{key.key}</Key>
                        <KeyboardDocDescription>{key.description}</KeyboardDocDescription>
                    </Fragment>
                ))}
            </KeyboardDocKeys>
            {children}
        </div>
    )
}

const KeyboardDocTitle = styled.h2`
    margin: 0 0 9px 0;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #c6c6c6;
    padding: 0 0 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        font-size: 26px;
    }
`

const KeyboardDocKeys = styled.div`
    display: grid;
    grid-template-columns: max-content auto;
    row-gap: 6px;
    column-gap: 12px;
    border-bottom: 1px solid #c6c6c6;
    padding-bottom: 6px;
    margin-bottom: 12px;
`

const KeyboardDocDescription = styled.div`
    padding-top: 3px;
    font-size: 14px;
`
