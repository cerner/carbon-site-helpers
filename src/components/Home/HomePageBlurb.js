import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../helpers/constants";
import CarbonMainIcon from "../SvgIcons/CarbonMainIcon";

const styles = (theme) => ({
    root: {
        flex: "1 0 100%",
        backgroundColor: theme.palette.background.paper
    },
    hero: {
        height: "100vh", // This is dependant on the height of the header
        flex: "0 0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    text: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textIndent: ".7rem",
        alignContent: "center",
        fontWeight: theme.typography.fontWeightLight,
        [theme.breakpoints.only("xs")]: {
            fontSize: 36
        },
        whiteSpace: "nowrap"
    },
    headline: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginTop: theme.spacing(4),
        maxWidth: 500,
        [theme.breakpoints.only("xs")]: {
            fontSize: 18
        },
        textAlign: "center"
    },
    button: {
        marginTop: theme.spacing(3),
        fontSize: 16,
        [theme.breakpoints.only("xs")]: {
            fontSize: 12
        }
    },
    social: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing(2)}px 0`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 20,
        boxSizing: "content-box",
        "& span": {
            display: "flex",
            marginRight: theme.spacing(1)
        },
        "& a": {
            color: theme.palette.background.paper
        }
    }
});

function HomePageBlurb(props) {
    const { classes, startLink } = props;

    return (
        <div className={classes.root}>
            <div className={classes.hero}>
                <div className={classes.content}>
                    <CarbonMainIcon />
                    <div className={classes.text}>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="textPrimary"
                            gutterBottom
                            className={classes.title}
                        >
                            Carbon
                        </Typography>
                        <Typography
                            variant="h5"
                            component="h2"
                            color="textPrimary"
                            gutterBottom
                            className={classes.headline}
                        >
                            A lightweight, vanilla JavaScript visualization API
                            built using D3 that integrates well with any
                            consumer&apos;s tech stack.
                        </Typography>
                        <Button
                            component={React.forwardRef((buttonProps, ref) => (
                                <Link
                                    underline="none"
                                    ref={ref}
                                    href={startLink}
                                    color="textPrimary"
                                    {...buttonProps}
                                />
                            ))}
                            className={classes.button}
                            color="primary"
                            variant="contained"
                        >
                            {constants.GETTING_STARTED}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

HomePageBlurb.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    startLink: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(HomePageBlurb);
