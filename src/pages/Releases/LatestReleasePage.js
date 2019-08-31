import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles/index";
import useReleases from "../../hooks/useReleases";
import CONSTANTS from "../../helpers/constants";
import { getLatestRelease } from "../../helpers/releasesInfo";

const styles = theme => ({
    container: {
        marginLeft: "10px",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        background: theme.palette.background.paper
    }
});
const LatestReleasePage = props => {
    const { classes, gitHubURL } = props;
    const { isHome } = props;

    if (isHome || !gitHubURL) {
        return "";
    }

    const releases = useReleases(gitHubURL);
    return releases.length ? (
        <Chip
            className={classes.container}
            label={getLatestRelease(releases)}
            component="a"
            href={`#/${CONSTANTS.VERSIONS_PATH}`}
            clickable
        />
    ) : (
        ""
    );
};

LatestReleasePage.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isHome: PropTypes.bool,
    gitHubURL: PropTypes.string
};

LatestReleasePage.defaultProps = {
    isHome: false,
    gitHubURL: ""
};

export default withStyles(styles, { withTheme: true })(LatestReleasePage);
