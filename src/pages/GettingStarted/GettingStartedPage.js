import { MuiThemeProvider } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";
import { RouterContextProvider } from "../../components/Context/RouterContext";
import ResponsiveDrawer from "../../components/Drawer/ResponsiveDrawer";
import CONSTANTS from "../../helpers/constants";

function GettingStartedPage(props) {
    const { pages, location, gitHubURL } = props;
    return (
        <RouterContextProvider value={location}>
            <MuiThemeProvider theme={CONSTANTS.THEME()}>
                <ResponsiveDrawer
                    pages={pages}
                    currentPage={location}
                    gitHubURL={gitHubURL}
                />
            </MuiThemeProvider>
        </RouterContextProvider>
    );
}

GettingStartedPage.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    gitHubURL: PropTypes.string.isRequired
};

export default withRouter(GettingStartedPage);
