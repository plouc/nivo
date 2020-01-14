/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createContext, PropsWithChildren, useMemo } from 'react'

// tslint:disable-next-line:variable-name
export const MotionConfigContext = createContext<{
    animate: boolean
    springConfig: {
        stiffness: number
        damping: number
    }
}>({} as any)

interface MotionConfigProviderProps {
    animate?: boolean
    stiffness?: number
    damping?: number
}

// tslint:disable-next-line:variable-name
export const MotionConfigProvider = ({
    children,
    animate = true,
    stiffness = 90,
    damping = 15,
}: PropsWithChildren<MotionConfigProviderProps>) => {
    const value = useMemo(
        () => ({
            animate,
            springConfig: { stiffness, damping },
        }),
        [animate, stiffness, damping]
    )

    return <MotionConfigContext.Provider value={value}>{children}</MotionConfigContext.Provider>
}
