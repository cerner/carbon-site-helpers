import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import constants from "../../helpers/constants";
import CarbonMainIcon from "../SvgIcons/CarbonMainIcon";

const useStyles = makeStyles(theme => ({
    toolbarContainer: {
        display: "flex",
        background: theme.palette.background.default
    },
    toolbar: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing(5),
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    title: {
        display: "flex",
        marginBottom: theme.spacing(0.5)
    },
    titleIcon: {
        margin: 0,
        border: 0,
        marginTop: theme.spacing(1 / 1.5),
        marginRight: theme.spacing(1 / 1.5),
        display: "flex",
        height: 32,
        width: 32
    }
}));

export default function ToolbarIcon() {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={classes.toolbarContainer}>
            <Toolbar className={classes.toolbar}>
                <Link
                    className={classes.title}
                    href={constants.HEADER_ROOT_LINK}
                    color="textPrimary"
                    underline="none"
                    variant="h4"
                >
                    <CarbonMainIcon className={classes.titleIcon} />
                    {constants.HEADER_MAIN_TITLE}
                </Link>
            </Toolbar>
        </AppBar>
    );
}
