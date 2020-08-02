/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useContext } from 'react'

export const themeContext = createContext()

export const useTheme = () => {
    const theme = useContext(themeContext)

    return theme
}
