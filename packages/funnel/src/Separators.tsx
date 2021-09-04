import { Separator } from './Separator'
import { SeparatorProps as SeparatorType } from './types'

interface SeparatorsProps {
    beforeSeparators: SeparatorType[]
    afterSeparators: SeparatorType[]
}

export const Separators = ({ beforeSeparators, afterSeparators }: SeparatorsProps) => (
    <>
        {beforeSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
        {afterSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
    </>
)
