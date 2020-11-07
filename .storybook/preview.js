/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { withInfo } from '@storybook/addon-info'
import theme from './manager'

export const parameters = {
    options: {
        theme,
    }
};
export const decorators = [withInfo({
    header: true,
    inline: true,
    propTables: false,
    source: false,
    maxPropObjectKeys: 10000,
    maxPropArrayLength: 10000,
    maxPropStringLength: 10000,
    styles: {
        infoBody: {
            border: 'none',
            borderRadius: 0,
            padding: '0 30px 20px',
            marginTop: '0',
            marginBottom: '0',
            boxShadow: 'none',
        },
        header: {
            h1: {
                fontSize: '28px',
            },
            h2: {
                fontSize: '16px',
            },
        },
        source: {
            h1: {
                fontSize: '22px',
            },
        },
    },
})];
