import PropTypes from "prop-types";

/* eslint-disable import/prefer-default-export */
export const childrenPropType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);
/* eslint-enable import/prefer-default-export */
