import PropTypes from "prop-types";

export const childrenPropType = PropTypes.oneOfType([
    // eslint-disable-line import/prefer-default-export
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);
