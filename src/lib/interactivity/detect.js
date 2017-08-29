/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const cursorInRect = (x, y, width, height, cursorX, cursorY) => {
    return x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height
}
