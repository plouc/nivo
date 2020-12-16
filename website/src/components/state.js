import { createContext, useContext } from 'react'

export const globalStateContext = createContext()
export const globalDispatchContext = createContext()

export const useGlobalState = () => useContext(globalStateContext)
export const useGlobalDispatch = () => useContext(globalDispatchContext)

export const globalStateReducer = (state, action) => {
    switch (action.type) {
        case 'setTheme':
            if (action.theme !== state.theme) {
                return {
                    ...state,
                    theme: action.theme,
                }
            }

            return state

        default:
            return state
    }
}
