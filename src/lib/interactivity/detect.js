/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Check if cursor position is in given rectangle.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} cursorX
 * @param {number} cursorY
 * @return {boolean}
 */
export const cursorInRect = (x, y, width, height, cursorX, cursorY) =>
    x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height
