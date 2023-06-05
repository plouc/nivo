import React, { ReactNode } from 'react'
import { SwitchableThemeProvider } from '../theming/SwitchableThemeProvider'
import '../styles/index.css'

export const RootWrapper = ({ children }: { children: ReactNode }) => (
    <SwitchableThemeProvider>{children}</SwitchableThemeProvider>
)
