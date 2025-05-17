import { ReactNode } from 'react'
// import isPlainObject from 'lodash/isPlainObject.js'
// import isArray from 'lodash/isArray.js'
// import isString from 'lodash/isString.js'
// import isNumber from 'lodash/isNumber.js'
// import isBoolean from 'lodash/isBoolean.js'
// import isFunction from 'lodash/isFunction.js'
// import styled from 'styled-components'
// import { ChartProperty } from '../../../types'
import { Flavor, ChartProperty} from "@/types/charts";
// import { ControlContext } from '../types'
import styles from './ControlHeader.module.css'

const getDefaultValue = (value: any) => {
    return value
    /*
    if (isPlainObject(value)) {
        return `${JSON.stringify(value)}`
    } else if (isArray(value)) {
        const elements = value.reduce((acc, v, i) => {
            acc.push(React.cloneElement(getDefaultValue(v), { key: i }))
            if (i + 1 < value.length) {
                acc.push(<span key={`${i}.comma`}>, </span>)
            }
            return acc
        }, [])

        return <span>[{elements}]</span>
    } else if (isString(value)) {
        return <code className="code-string">'{value}'</code>
    } else if (isNumber(value)) {
        return <code className="code-number">{value}</code>
    } else if (isBoolean(value)) {
        return <code className="code-boolean">{value ? 'true' : 'false'}</code>
    } else if (isFunction(value)) {
        return `{${value.toString()}}`
    }

    return value
     */
}

type ControlHeaderProps = ChartProperty & {
    id?: string
    // context?: ControlContext
    currentFlavor?: Flavor
}

export const ControlHeader = ({
    id,
    name,
    type,
    required,
    // defaultValue,
    // context,
    currentFlavor,
}: ControlHeaderProps) => {
    let label: ReactNode = name
    // if (context) {
    //     label = (
    //         <>
    //             <LabelParentPath>{context.path.join('.')}.</LabelParentPath>
    //             {name}
    //         </>
    //     )
    // }

    console.log({
        id,
        name,
        type,
        required,
        // defaultValue,
        // context,
        currentFlavor,
    })

    let propertyType: string | undefined = undefined
    if (type !== undefined) {
        if (typeof type === 'string') {
            propertyType = type
        } else if (typeof type === 'object' && currentFlavor) {
            // If an object is provided, it means it depends on the current flavor.
            propertyType = type[currentFlavor]
        }
    }

    return (
        <div className={styles.header}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            {propertyType && <span className={styles.prop_type}>{propertyType}</span>}
            <span className={styles.required}>required</span>
            <span className={styles.optional}>optional</span>
            <span className={styles.default}>default</span>
            {/*
            {required && <Required>required</Required>}
            {!required && <Optional>optional</Optional>}
            {defaultValue !== undefined && (
                <>
                    <Default>default:</Default>
                    {getDefaultValue(defaultValue)}
                </>
            )}
            */}
        </div>
    )
}

/*
const LabelParentPath = styled.span`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textLight};
`
*/