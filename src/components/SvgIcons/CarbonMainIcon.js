import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import SvgIcon from "../../../public/Carbon.svg";
import CONSTANTS from "../../helpers/constants";

const styles = theme => ({
    logo: {
        margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 4}px`,
        width: "100%",
        height: "35vw",
        maxHeight: 250
    }
});

const CarbonMainIcon = ({ classes, className }) => (
    <img
        className={classNames(classes.logo, className)}
        alt={CONSTANTS.HEADER_MAIN_TITLE}
        src={SvgIcon}
    />
);

CarbonMainIcon.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string
};

CarbonMainIcon.defaultProps = {
    className: ""
};

export default withStyles(styles, { withTheme: true })(CarbonMainIcon);
