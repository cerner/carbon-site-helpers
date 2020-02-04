import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../helpers/constants";

const styles = (theme) => ({
    root: {
        flex: "1",
        height: `calc(100vh - ${theme.spacing(5)}px)`,
        width: `calc(100vw - ${theme.spacing(5)}px)`,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        textAlign: "center"
    },
    primaryText: {
        color: theme.palette.primary.main,
        fontSize: 192
    },
    secondaryText: {
        color: theme.palette.secondary.main,
        fontSize: 48
    }
});

function NotFoundPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Typography
                variant="h1"
                gutterBottom
                className={classes.primaryText}
                color="primary"
            >
                {constants.NOTFOUND_PRIMARY_TITLE}
            </Typography>
            <Typography
                variant="h4"
                gutterBottom
                className={classes.secondaryText}
                color="secondary"
            >
                {constants.NOTFOUND_SECONDARY_TITLE}
            </Typography>
        </div>
    );
}

NotFoundPage.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, { withTheme: true })(NotFoundPage);
