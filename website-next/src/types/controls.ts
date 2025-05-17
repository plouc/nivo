export interface ChoiceWithLabel<V extends string = string> {
    label: string
    value: V
}

export interface ChoicesControlConfig<V extends string = string> {
    type: 'choices'
    disabled?: boolean
    choices: V[] | ChoiceWithLabel<V>[]
}