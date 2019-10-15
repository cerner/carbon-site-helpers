import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Box from "@material-ui/core/Box";
import { makeSearchTitle } from "../../helpers/searchHelpers";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    homeIcon: {
        display: "flex",
        alignItems: "center"
    },
    breadcrumb: {
        color: theme.palette.text.primary
    },
    navNextIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function ContentBreadcrumb(props) {
    const classes = useStyles();
    const { pathname } = props;
    const pathPartitions = makeSearchTitle(pathname).split(">");
    return (
        <Box p={2} className={classes.root}>
            <Typography className={classes.homeIcon} variant="button">
                <HomeRoundedIcon fontSize="small" />
                <NavigateNextIcon
                    className={classes.navNextIcon}
                    fontSize="small"
                />
            </Typography>
            <Breadcrumbs
                className={classes.breadcrumb}
                maxItems={3}
                itemsBeforeCollapse={2}
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {pathPartitions.map(p => (
                    <Typography variant="button" key={p}>
                        {p.trim()}
                    </Typography>
                ))}
            </Breadcrumbs>
        </Box>
    );
}

ContentBreadcrumb.propTypes = {
    pathname: PropTypes.string.isRequired
};
