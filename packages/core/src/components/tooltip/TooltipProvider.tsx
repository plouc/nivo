import { PropsWithChildren, RefObject } from 'react'
import { TooltipActionsContext, TooltipStateContext } from './context'
import { useTooltipHandlers } from './hooks'

interface TooltipProviderProps {
    container: RefObject<HTMLDivElement>
}

export const TooltipProvider = ({
    container,
    children,
}: PropsWithChildren<TooltipProviderProps>) => {
    const { actions, state } = useTooltipHandlers(container)

    return (
        <TooltipActionsContext.Provider value={actions}>
            <TooltipStateContext.Provider value={state}>{children}</TooltipStateContext.Provider>
        </TooltipActionsContext.Provider>
    )
}
