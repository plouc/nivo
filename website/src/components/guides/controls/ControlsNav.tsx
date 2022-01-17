import React from 'react'
import { Link } from 'gatsby'


export const ControlsNav = () => {
    return (
        <div>
            <div>Generics</div>
            <div>
                <Link to="/guides/controls/object/">ObjectControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/radio/">RadioControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/range/">RangeControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/switch/">SwitchControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/text/">TextControl</Link>
            </div>
            <div>Specialized</div>
            <div>
                <Link to="/guides/controls/angle/">AngleControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/box-anchor/">BoxAnchorControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/line-width/">LineWidthControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/margin/">MarginControl</Link>
            </div>
            <div>Colors</div>
            <div>
                <Link to="/guides/controls/blend-mode/">BlendModeControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/color/">ColorControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/opacity/">OpacityControl</Link>
            </div>
            <div>
                <Link to="/guides/controls/ordinal-colors/">OrdinalColorsControl</Link>
            </div>
        </div>
    )
}