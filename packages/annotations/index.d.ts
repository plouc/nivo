/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, ReactNode } from 'react'
import { MotionProps } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'

declare module '@nivo/annotations' {
    export type AnnotationType = 'circle' | 'dot' | 'rect'

    export type NoteCoordinate = number | { abs: number | string }

    type CommonAnnotationProps = {
        containerWidth: number
        containerHeight: number

        x: number
        y: number

        noteX: NoteCoordinate
        noteY: NoteCoordinate
        noteWidth?: number
        noteTextOffset?: number
        note: ReactNode
    } & MotionProps

    export type CircleAnnotationProps = CommonAnnotationProps & {
        type: 'circle'
        size: number
    }

    export type DotAnnotationProps = CommonAnnotationProps & {
        type: 'dot'
        size?: number
    }

    export type RectAnnotationProps = CommonAnnotationProps & {
        type: 'rect'
        width: number
        height: number
    }

    export type AnnotationProps = CircleAnnotationProps | DotAnnotationProps | RectAnnotationProps

    export class Annotation extends Component<AnnotationProps> {}
}
