import AppBar from "@material-ui/core/AppBar/index";
import IconButton from "@material-ui/core/IconButton/index";
import { withStyles } from "@material-ui/core/styles/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import Typography from "@material-ui/core/Typography/index";
import MenuIcon from "@material-ui/icons/MenuRounded";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../helpers/constants";
import SearchBar from "../Search/SearchBar";
import GithubIcon from "../SvgIcons/GitHubIcon";
import LatestReleasePage from "../../pages/Releases/LatestReleasePage";

const styles = theme => ({
    appBarHome: {
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main,
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    appBarWithNav: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${constants.DRAWER_WIDTH}px)`
        },
        minWidth: 0,
        flexBasis: "50%"
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    headerTitle: {
        flexGrow: 1,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        [theme.breakpoints.down("sm")]: {
            fontSize: 18
        }
    }
});

function Header(props) {
    const {
        classes,
        title,
        onMenuClick,
        isHome,
        pages,
        gitHubURL,
        withNav
    } = props;
    return (
        <AppBar
            position="fixed"
            className={classNames({
                [classes.appBarHome]: true,
                [classes.appBarWithNav]: !isHome && withNav
            })}
        >
            <Toolbar>
                <IconButton
                    className={classes.menuButton}
                    style={{ display: isHome ? "none" : "" }}
                    onClick={onMenuClick}
                    color="inherit"
                    aria-label="Menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    color="inherit"
                    title={title}
                    className={classes.headerTitle}
                >
                    {title}
                </Typography>
                <SearchBar pages={pages} isHome={isHome} withNav={withNav} />
                <LatestReleasePage isHome={isHome} gitHubURL={gitHubURL} />
                <Tooltip title={constants.GITHUB_REPO_TOOLTIP} enterDelay={300}>
                    <IconButton
                        component="a"
                        color="inherit"
                        href={gitHubURL}
                        target="_blank"
                        aria-label={constants.GITHUB_REPO_TOOLTIP}
                        data-ga-event-category="AppBar"
                        data-ga-event-action="github"
                    >
                        <GithubIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.object),
    onMenuClick: PropTypes.func,
    title: PropTypes.string,
    isHome: PropTypes.bool,
    gitHubURL: PropTypes.string,
    withNav: PropTypes.bool
};

Header.defaultProps = {
    title: "",
    pages: [],
    onMenuClick: () => {},
    isHome: false,
    withNav: true,
    gitHubURL: ""
};

export default withStyles(styles, { withTheme: true })(Header);
