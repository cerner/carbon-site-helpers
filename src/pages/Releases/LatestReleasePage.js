import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles/index";
import Box from "@material-ui/core/Box";
import useReleases from "../../hooks/useReleases";
import constants from "../../helpers/constants";
import { getLatestRelease } from "../../helpers/releasesInfo";

const styles = theme => ({
    container: {
        marginLeft: "10px",
        fontWeight: "bold",
        background: theme.palette.background.paper
    }
});
const LatestReleasePage = props => {
    const { className, classes, gitHubURL, isHome } = props;

    if (isHome || !gitHubURL) {
        return "";
    }

    const releases = useReleases(gitHubURL);
    return releases.length ? (
        <Box className={className}>
            <Chip
                className={classes.container}
                label={getLatestRelease(releases)}
                component="a"
                href={`#/${constants.VERSIONS_PATH}`}
                clickable
            />
        </Box>
    ) : (
        ""
    );
};

LatestReleasePage.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    isHome: PropTypes.bool,
    gitHubURL: PropTypes.string
};

LatestReleasePage.defaultProps = {
    className: "",
    isHome: false,
    gitHubURL: ""
};

export default withStyles(styles, { withTheme: true })(LatestReleasePage);
