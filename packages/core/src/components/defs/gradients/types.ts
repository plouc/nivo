export type GradientColor = {
    offset: number
    color: string
    opacity: number
}

export interface LinearGradientProps {
    id: string
    colors: GradientColor[]
    gradientTransform: string
}

export interface LinearGradientSpec extends LinearGradientProps {
    type: 'linearGradient'
}
