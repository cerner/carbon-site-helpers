import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import CarbonLogo from "../../../public/Carbon.svg";

const styles = (theme) => ({
    logo: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(4)}px`,
        height: "35vw",
        maxHeight: 250,
        "&:hover": {
            transition: "transform 0.75s ease-in-out",
            transitionDelay: "0.3s",
            transform: "rotateZ(360deg)"
        }
    }
});

const CarbonMainIcon = ({ classes, className }) => (
    <CarbonLogo
        id="carbon-logo"
        className={classNames(classes.logo, className)}
    />
);

CarbonMainIcon.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string
};

CarbonMainIcon.defaultProps = {
    className: ""
};

CarbonMainIcon.muiName = "SvgIcon";

export default withStyles(styles, { withTheme: true })(CarbonMainIcon);
