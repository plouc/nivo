/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

const hasBrowserContext = !!(
    (typeof window !== 'undefined' && window.document && window.document.createElement)
);


export default hasBrowserContext;
