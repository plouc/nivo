import PropTypes from 'prop-types'
import { clip } from '../lib/clip'

clip.propTypes = {
  ctx: PropTypes.string.isRequired,
  margin: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
